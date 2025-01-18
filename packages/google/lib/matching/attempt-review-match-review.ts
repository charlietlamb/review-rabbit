import { Client } from '@rabbit/database/schema/app/clients'
import { getNameMatchScore } from './utils/name-matching'

export function attemptReviewMatchReview(
  reviewName: string,
  clients: Client[]
) {
  const matches = clients.map((client) => ({
    client,
    matchScore: getNameMatchScore(client.name, reviewName),
  }))

  // Return the best match if any
  const bestMatch = matches.reduce(
    (best, current) => (current.matchScore > best.matchScore ? current : best),
    { matchScore: 0, client: null as Client | null }
  )

  if (bestMatch.matchScore > 0) {
    return {
      client: bestMatch.client!,
      matchScore: bestMatch.matchScore,
    }
  }

  return null
}
