import { Review } from './types'
import { Account } from '@rabbit/database/schema/auth/accounts'
import { auth } from '@rabbit/auth'
import { getEnv } from '@rabbit/env'

const PAGE_SIZE = 100
const REQUIRED_SCOPE = 'https://www.googleapis.com/auth/business.manage'

function hasRequiredScope(account: Account): boolean {
  if (!account.scope) return false
  return account.scope.split(' ').includes(REQUIRED_SCOPE)
}

export async function addRequiredScope(account: Account): Promise<Account> {
  const params = new URLSearchParams({
    client_id: getEnv().NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: `${getEnv().NEXT_PUBLIC_API}/business/callback/success`,
    response_type: 'code',
    scope: REQUIRED_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    login_hint: account.providerId, // Use existing Google account
    state: account.id, // Pass the account ID to identify which account to update
  })

  if (typeof window !== 'undefined') {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    throw new Error('Redirecting to Google Auth for additional scopes...')
  }

  throw new Error('Cannot request additional scopes in server environment')
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
  account: Account,
  returnUrl?: string
): Promise<Review[]> {
  if (!hasRequiredScope(account)) {
    // Try to add the required scope to the existing account
    await addRequiredScope(account)
  }

  try {
    const reviews: Review[] = []
    let nextPageToken: string | undefined
    let totalRating = 0
    let allReviews: Review[] = []
    const targetPage = page - 1 // Convert to 0-based index

    do {
      const response = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${account.accountId}/locations/-/reviews?pageSize=100${
          nextPageToken ? `&pageToken=${nextPageToken}` : ''
        }`,
        {
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

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
            ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'].indexOf(review.starRating) +
            1
        })
      }

      nextPageToken = reviewsData.nextPageToken
    } while (nextPageToken)

    const startIndex = targetPage * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    reviews.push(...allReviews.slice(startIndex, endIndex))

    return reviews
  } catch (error) {
    console.error('Error fetching Google Business Profile reviews:', error)
    throw error
  }
}
