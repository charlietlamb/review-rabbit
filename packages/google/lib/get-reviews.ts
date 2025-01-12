import { Review } from '../types'
import { Account } from '@rabbit/database/schema/auth/accounts'
import { getEnv } from '@rabbit/env'
import { addBusinessScope } from './business/add-business-scope'
import { hasBusinessScope } from './business/has-business-scope'
import { OAuth2Client } from 'google-auth-library'
import { db } from '@rabbit/database'
import { eq } from 'drizzle-orm'
import { accounts } from '@rabbit/database/schema/auth/accounts'

const PAGE_SIZE = 100

async function refreshAccessToken(account: Account): Promise<Account> {
  if (!account.refreshToken) {
    throw new Error('No refresh token available')
  }

  const oauth2Client = new OAuth2Client(
    getEnv().NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    getEnv().GOOGLE_CLIENT_SECRET,
    `${getEnv().NEXT_PUBLIC_API}/business/callback/success`
  )

  oauth2Client.setCredentials({
    refresh_token: account.refreshToken,
  })

  try {
    const { credentials } = await oauth2Client.refreshAccessToken()

    // Update the account in the database with new tokens
    const updatedAccount = await db
      .update(accounts)
      .set({
        accessToken: credentials.access_token,
        accessTokenExpiresAt: credentials.expiry_date
          ? new Date(credentials.expiry_date)
          : null,
        refreshToken: credentials.refresh_token || account.refreshToken, // Keep old refresh token if new one not provided
      })
      .where(eq(accounts.id, account.id))
      .returning()

    return updatedAccount[0]
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw new Error('Failed to refresh access token')
  }
}

export function redirectToAuth(returnUrl?: string): never {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams()
    if (returnUrl) {
      params.append('returnTo', returnUrl)
    }
    params.append('provider', 'google')
    window.location.href = `${getEnv().NEXT_PUBLIC_API}/api/auth/signin/google?${params.toString()}`
  }
  throw new Error('Redirecting to auth...')
}

export async function getReviews(
  page: number = 1,
  account: Account
): Promise<Review[]> {
  if (!hasBusinessScope(account)) {
    await addBusinessScope(account)
  }

  let currentAccount = account
  let retryCount = 0
  const MAX_RETRIES = 1

  while (retryCount <= MAX_RETRIES) {
    try {
      const reviews: Review[] = []
      let nextPageToken: string | undefined
      let totalRating = 0
      let allReviews: Review[] = []
      const targetPage = page - 1

      do {
        const response = await fetch(
          `https://mybusiness.googleapis.com/v4/accounts/${currentAccount.accountId}/locations/-/reviews?pageSize=100${
            nextPageToken ? `&pageToken=${nextPageToken}` : ''
          }`,
          {
            headers: {
              Authorization: `Bearer ${currentAccount.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.status === 401 && retryCount < MAX_RETRIES) {
          // Token is expired or invalid, try to refresh it
          currentAccount = await refreshAccessToken(currentAccount)
          retryCount++
          break // Break the do-while loop to retry with new token
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.statusText}`)
        }

        const reviewsData = await response.json()
        if (reviewsData.reviews) {
          const typedReviews = reviewsData.reviews as Omit<Review, 'id'>[]
          const reviewsWithId = typedReviews.map((review) => ({
            ...review,
            id: review.reviewId,
          }))
          allReviews.push(...reviewsWithId)
          reviewsWithId.forEach((review) => {
            totalRating +=
              ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'].indexOf(
                review.starRating
              ) + 1
          })
        }

        nextPageToken = reviewsData.nextPageToken
      } while (nextPageToken)

      const startIndex = targetPage * PAGE_SIZE
      const endIndex = startIndex + PAGE_SIZE
      reviews.push(...allReviews.slice(startIndex, endIndex))

      return reviews
    } catch (error) {
      if (retryCount === MAX_RETRIES) {
        console.error('Error fetching Google Business Profile reviews:', error)
        throw error
      }
      retryCount++
    }
  }

  throw new Error('Failed to fetch reviews after max retries')
}
