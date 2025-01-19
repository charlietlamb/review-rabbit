import type { ReviewWithData } from '@rabbit/database/schema/app/reviews'

export function transformReview(review: any): ReviewWithData {
  return {
    ...review,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
    business: {
      ...review.business,
      createdAt: review.business.createdAt.toISOString(),
      updatedAt: review.business.updatedAt.toISOString(),
    },
    location: review.location && {
      ...review.location,
      createdAt: review.location.createdAt.toISOString(),
      updatedAt: review.location.updatedAt.toISOString(),
    },
  }
}
