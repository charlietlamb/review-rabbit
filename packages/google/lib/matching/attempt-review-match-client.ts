import { Review } from '@rabbit/database/schema/app/reviews'
import { ClientFormData } from '@rabbit/design-system/components/dashboard/clients/client-schema'
import { getNameMatchScore } from './utils/name-matching'

export function attemptReviewMatchClient(
  client: ClientFormData,
  reviews: Review[]
) {
  const matches = reviews.map((review) => ({
    review,
    matchScore: getNameMatchScore(client.name, review.reviewerName),
  }))

  // Return the best match if any
  const bestMatch = matches.reduce(
    (best, current) => (current.matchScore > best.matchScore ? current : best),
    { matchScore: 0, review: null as Review | null }
  )

  if (bestMatch.matchScore > 0) {
    return {
      review: bestMatch.review!,
      matchScore: bestMatch.matchScore,
    }
  }

  return null
}
