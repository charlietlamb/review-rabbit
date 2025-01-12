'use server'

import { Review } from '../types'
import { Account } from '@rabbit/database/schema/auth/accounts'
import { addBusinessScope } from './business/add-business-scope'
import { hasBusinessScope } from './business/has-business-scope'
import { refreshAccessToken } from './auth/refresh-access-token'
import { GOOGLE_BUSINESS_SCOPE } from './data'

const PAGE_SIZE = 100
const MAX_RETRIES = 2
const RATE_LIMIT_DELAY = 1000 // 1 second delay between requests

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getReviews(
  page: number = 1,
  account: Account
): Promise<Review[]> {
  try {
    // Validate input
    if (page < 1) {
      throw new Error('Page must be greater than 0')
    }

    if (!account.accessToken) {
      throw new Error('No access token available')
    }

    // Check for business scope
    if (!hasBusinessScope(account)) {
      await addBusinessScope(account)
      return [] // Return empty array since we're redirecting for scope
    }

    let currentAccount = account
    let retryCount = 0

    while (retryCount <= MAX_RETRIES) {
      try {
        const allReviews: Review[] = []
        let nextPageToken: string | undefined

        do {
          // Add rate limiting delay between requests
          if (allReviews.length > 0) {
            await delay(RATE_LIMIT_DELAY)
          }

          const response = await fetch(
            `https://mybusiness.googleapis.com/v4/accounts/${currentAccount.accountId}/locations/-/reviews?pageSize=${PAGE_SIZE}${
              nextPageToken ? `&pageToken=${nextPageToken}` : ''
            }`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${currentAccount.accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=60', // Cache for 1 minute
              },
            }
          )

          // Handle auth errors
          if (response.status === 401 || response.status === 403) {
            if (retryCount >= MAX_RETRIES) {
              throw new Error('Authentication failed after max retries')
            }

            // Refresh token and retry
            currentAccount = await refreshAccessToken(currentAccount)
            retryCount++
            break // Break do-while loop to retry with new token
          }

          // Handle rate limiting
          if (response.status === 429) {
            const retryAfter = parseInt(
              response.headers.get('Retry-After') || '60',
              10
            )
            await delay(retryAfter * 1000)
            continue // Retry the same request
          }

          // Handle other errors
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(
              `Failed to fetch reviews: ${response.statusText} (${
                response.status
              }) ${JSON.stringify(errorData)}`
            )
          }

          const reviewsData = await response.json()

          if (!reviewsData.reviews) {
            break // No more reviews to fetch
          }

          const typedReviews = reviewsData.reviews as Omit<Review, 'id'>[]
          const reviewsWithId = typedReviews.map((review) => ({
            ...review,
            id: review.reviewId,
          }))

          allReviews.push(...reviewsWithId)
          nextPageToken = reviewsData.nextPageToken
        } while (nextPageToken)

        // Calculate pagination
        const startIndex = (page - 1) * PAGE_SIZE
        const endIndex = startIndex + PAGE_SIZE

        // Return paginated results
        return allReviews.slice(startIndex, endIndex)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('Authentication failed')
        ) {
          throw error // Don't retry auth failures
        }

        if (retryCount === MAX_RETRIES) {
          console.error(
            'Error fetching Google Business Profile reviews:',
            error
          )
          throw new Error('Failed to fetch reviews after max retries')
        }

        await delay(Math.pow(2, retryCount) * 1000) // Exponential backoff
        retryCount++
      }
    }

    throw new Error('Failed to fetch reviews after max retries')
  } catch (error) {
    console.error('Error in getReviews:', error)
    throw error
  }
}
