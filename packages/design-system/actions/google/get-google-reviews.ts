'use server'

import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'
import { Review } from '@rabbit/google/types'

export async function getGoogleReviews(page: number): Promise<Review[]> {
  const response = await client.google.reviews.$post(
    {
      json: {
        page,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    console.error('Failed to fetch reviews')
    return []
  }
  const reviews = await response.json()

  return reviews.map((review) => ({
    ...review,
    createTime: new Date(review.createTime),
    updateTime: new Date(review.updateTime),
  }))
}
