'use server'

import { ReviewWithData } from '@rabbit/database/schema/app/reviews'
import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { transformReview } from '@rabbit/design-system/lib/transforms/review-transform'

export async function getReviewsByDateRange(
  from: Date,
  to: Date,
  businessId: string,
  locationId?: string
): Promise<ReviewWithData[]> {
  const response = await client.reviews['date-range'].$post(
    {
      json: {
        from: from.toISOString(),
        to: to.toISOString(),
        businessId,
        locationId,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch clicks by date range')
  }
  const reviewsResults = await response.json()
  return reviewsResults.map(transformReview)
}
