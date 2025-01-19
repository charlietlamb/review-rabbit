import type { ClientWithData } from '@rabbit/database/schema/app/clients'

export function transformClient(client: any): ClientWithData {
  return {
    ...client,
    createdAt: new Date(client.createdAt),
    updatedAt: new Date(client.updatedAt),
    business: {
      ...client.business,
      createdAt: new Date(client.business.createdAt),
      updatedAt: new Date(client.business.updatedAt),
    },
    location: {
      ...client.location,
      createdAt: new Date(client.location.createdAt),
      updatedAt: new Date(client.location.updatedAt),
    },
    reviewMatches: client.reviewMatches.map((match: any) => ({
      ...match,
      createdAt: new Date(match.createdAt),
      updatedAt: new Date(match.updatedAt),
    })),
  }
}
