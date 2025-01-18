import { AppRouteHandler } from '@rabbit/hono/lib/types'
import { HttpStatusCodes } from '@rabbit/http'
import { getReviews } from '@rabbit/google/lib/get-reviews'
import { db } from '@rabbit/database'
import { eq } from 'drizzle-orm'
import { accounts, reviews } from '@rabbit/database/schema'
import { GetReviewsRoute } from '@rabbit/hono/routes/google/google.routes'

const mockReviews = [
  {
    createTime: '2024-03-10T15:30:00Z',
    name: 'accounts/123/locations/456/reviews/789',
    id: 'review_123456789',
    reviewId: 'review_123456789',
    reviewer: {
      displayName: 'Sarah Johnson',
      profilePhotoUrl: 'https://example.com/photos/1.jpg',
    },
    starRating: 'FIVE',
    comment:
      'Absolutely fantastic service! The staff went above and beyond to help me. The facilities are modern and clean. Would highly recommend to anyone looking for top-notch service.',
    updateTime: '2024-03-10T15:30:00Z',
    reviewReply: {
      comment:
        "Thank you so much for your kind words, Sarah! We're thrilled to hear about your positive experience.",
      updateTime: '2024-03-11T09:15:00Z',
      createTime: '2024-03-11T09:15:00Z',
    },
  },
  {
    createTime: '2024-03-09T14:20:00Z',
    name: 'accounts/123/locations/456/reviews/790',
    id: 'review_987654321',
    reviewId: 'review_987654321',
    reviewer: {
      displayName: 'Michael Chen',
      profilePhotoUrl: 'https://example.com/photos/2.jpg',
    },
    starRating: 'FOUR',
    comment:
      'Great experience overall. Professional team and quality service. Only minor issue was the wait time, but otherwise excellent.',
    updateTime: '2024-03-09T14:20:00Z',
  },
  {
    createTime: '2024-03-08T11:45:00Z',
    name: 'accounts/123/locations/456/reviews/791',
    id: 'review_456789123',
    reviewId: 'review_456789123',
    reviewer: {
      displayName: 'Emma Wilson',
      profilePhotoUrl: 'https://example.com/photos/3.jpg',
    },
    starRating: 'FIVE',
    comment:
      "Exceptional attention to detail! The team here really knows their stuff. I've been a customer for years and they never disappoint.",
    updateTime: '2024-03-08T11:45:00Z',
    reviewReply: {
      comment:
        'Thanks Emma! We value our long-term customers and always strive to maintain our high standards.',
      updateTime: '2024-03-08T16:30:00Z',
      createTime: '2024-03-08T16:30:00Z',
    },
  },
  {
    createTime: '2024-03-07T09:15:00Z',
    name: 'accounts/123/locations/456/reviews/792',
    id: 'review_789123456',
    reviewId: 'review_789123456',
    reviewer: {
      displayName: 'Anonymous User',
    },
    starRating: 'THREE',
    comment:
      'Service was okay. Room for improvement in customer communication.',
    updateTime: '2024-03-07T09:15:00Z',
    reviewReply: {
      comment:
        'We appreciate your feedback and will work on improving our communication. Please reach out to us directly to discuss your experience.',
      updateTime: '2024-03-07T13:20:00Z',
      createTime: '2024-03-07T13:20:00Z',
    },
  },
  {
    createTime: '2024-03-06T16:50:00Z',
    name: 'accounts/123/locations/456/reviews/793',
    id: 'review_321654987',
    reviewId: 'review_321654987',
    reviewer: {
      displayName: 'David Thompson',
      profilePhotoUrl: 'https://example.com/photos/5.jpg',
    },
    starRating: 'FIVE',
    comment:
      'Incredible value for money! The team is knowledgeable and efficient. Highly recommend their premium services.',
    updateTime: '2024-03-06T16:50:00Z',
  },
  {
    createTime: '2024-03-05T10:30:00Z',
    name: 'accounts/123/locations/456/reviews/794',
    id: 'review_147258369',
    reviewId: 'review_147258369',
    reviewer: {
      displayName: 'Lisa Rodriguez',
      profilePhotoUrl: 'https://example.com/photos/6.jpg',
    },
    starRating: 'FOUR',
    comment:
      'Very professional service. The only reason for not giving 5 stars is the parking situation, but the service itself was great!',
    updateTime: '2024-03-05T10:30:00Z',
    reviewReply: {
      comment:
        "Thank you for your review, Lisa! We're working on improving our parking situation.",
      updateTime: '2024-03-05T14:45:00Z',
      createTime: '2024-03-05T14:45:00Z',
    },
  },
  {
    createTime: '2024-03-04T13:15:00Z',
    name: 'accounts/123/locations/456/reviews/795',
    id: 'review_963852741',
    reviewId: 'review_963852741',
    reviewer: {
      displayName: 'James Wilson',
      profilePhotoUrl: 'https://example.com/photos/7.jpg',
    },
    starRating: 'FIVE',
    comment:
      'Best service in town! The staff is friendly and the results exceeded my expectations. Will definitely be coming back.',
    updateTime: '2024-03-04T13:15:00Z',
    reviewReply: {
      comment: "Thanks James! We're glad we could exceed your expectations.",
      updateTime: '2024-03-04T15:30:00Z',
      createTime: '2024-03-04T15:30:00Z',
    },
  },
  {
    createTime: '2024-03-03T09:45:00Z',
    name: 'accounts/123/locations/456/reviews/796',
    id: 'review_852963741',
    reviewId: 'review_852963741',
    reviewer: {
      displayName: 'Maria Garcia',
      profilePhotoUrl: 'https://example.com/photos/8.jpg',
    },
    starRating: 'FOUR',
    comment:
      'Reliable and consistent service. Have been using them for months and always satisfied with the results.',
    updateTime: '2024-03-03T09:45:00Z',
    reviewReply: {
      comment:
        'Thank you for being a loyal customer, Maria! We appreciate your continued trust in our services.',
      updateTime: '2024-03-03T11:20:00Z',
      createTime: '2024-03-03T11:20:00Z',
    },
  },
]

export const getReviewsHandler: AppRouteHandler<GetReviewsRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  // Commented out original implementation for now
  const { page } = await c.req.json()
  if (page === 1) {
    return c.json(mockReviews, HttpStatusCodes.OK)
  } else {
    return c.json([], HttpStatusCodes.OK)
  }

  const account = await db.query.accounts.findFirst({
    where: eq(accounts.userId, user.id),
  })
  if (!account) {
    return c.json({ error: 'Account not found' }, HttpStatusCodes.NOT_FOUND)
  }
  try {
    // const reivews = await getReviews(page, account)
    const reivews = mockReviews
    return c.json(newReviews, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to fetch clients' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
