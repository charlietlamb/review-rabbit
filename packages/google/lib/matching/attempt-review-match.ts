import { Review } from '@rabbit/database/schema/app/reviews'
import { ClientFormData } from '@rabbit/design-system/components/dashboard/clients/client-schema'

function normalizeForComparison(name: string): string {
  return name.toLowerCase().trim()
}

function getNameParts(fullName: string): { first: string; last?: string } {
  const parts = normalizeForComparison(fullName).split(' ').filter(Boolean)
  return {
    first: parts[0],
    last: parts.length > 1 ? parts[parts.length - 1] : undefined,
  }
}

/**
 * Attempts to match a client name with a reviewer name
 * Returns a match score:
 * 0 = No match
 * 1 = First name match when reviewer has only first name
 * 2 = First name match + last name initial match
 * 3 = Full name match
 */
function getNameMatchScore(clientName: string, reviewerName: string): number {
  const clientParts = getNameParts(clientName)
  const reviewerParts = getNameParts(reviewerName)

  // Both names must have a first name
  if (!clientParts.first || !reviewerParts.first) {
    return 0
  }

  // Check for exact full name match
  if (
    normalizeForComparison(clientName) === normalizeForComparison(reviewerName)
  ) {
    return 3
  }

  // Check first name match + full last name match
  if (
    clientParts.first === reviewerParts.first &&
    clientParts.last &&
    reviewerParts.last &&
    clientParts.last === reviewerParts.last
  ) {
    return 3
  }

  // Check first name match + last name initial match
  if (
    clientParts.first === reviewerParts.first &&
    clientParts.last &&
    reviewerParts.last &&
    reviewerParts.last.length === 1 &&
    clientParts.last.charAt(0).toLowerCase() ===
      reviewerParts.last.toLowerCase()
  ) {
    return 2
  }

  // Check first name only match when reviewer has only first name
  if (clientParts.first === reviewerParts.first && !reviewerParts.last) {
    return 1
  }

  return 0
}

export function attemptReviewMatch(client: ClientFormData, reviews: Review[]) {
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
