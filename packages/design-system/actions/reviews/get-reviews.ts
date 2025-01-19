'use server'

import { ReviewWithData } from '@rabbit/database/schema/app/reviews'
import client from '@rabbit/design-system/lib/client'
import { PAGE_SIZE } from '@rabbit/design-system/data/page-size'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { transformReview } from '@rabbit/design-system/lib/transforms/review-transform'

export async function getReviews(
  page: number,
  businessId: string,
  locationId?: string
): Promise<ReviewWithData[]> {
  const response = await client.reviews.$post(
    {
      json: {
        offset: page * PAGE_SIZE,
        limit: PAGE_SIZE,
        businessId,
        locationId,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch reviews')
  }
  const reviewsResults = await response.json()
  return reviewsResults.map(transformReview)
}
