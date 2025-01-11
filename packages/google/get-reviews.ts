import { google } from 'googleapis'

interface Review {
  name: string
  reviewId: string
  reviewer: {
    displayName: string
    profilePhotoUrl?: string
  }
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  comment: string
  createTime: string
  updateTime: string
  reviewReply?: {
    comment: string
    updateTime: string
  }
}

interface ReviewsResponse {
  reviews: Review[]
  averageRating: number
  totalReviewCount: number
}

export async function getReviews(
  accountId: string,
  accessToken: string
): Promise<ReviewsResponse> {
  try {
    const reviews: Review[] = []
    let nextPageToken: string | undefined
    let totalRating = 0

    do {
      const response = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/-/reviews?pageSize=100${
          nextPageToken ? `&pageToken=${nextPageToken}` : ''
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`)
      }

      const reviewsData = await response.json()
      if (reviewsData.reviews) {
        const typedReviews = reviewsData.reviews as Review[]
        reviews.push(...typedReviews)
        typedReviews.forEach((review) => {
          totalRating +=
            ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'].indexOf(review.starRating) +
            1
        })
      }

      nextPageToken = reviewsData.nextPageToken
    } while (nextPageToken)

    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

    return {
      reviews,
      averageRating,
      totalReviewCount: reviews.length,
    }
  } catch (error) {
    console.error('Error fetching Google Business Profile reviews:', error)
    throw error
  }
}
