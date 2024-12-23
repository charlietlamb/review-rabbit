type Testimonial = {
  quote: string
  name: string
  handle: string
  imageUrl: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'The scheduling and client management features have transformed how I run my practice. I can focus more on mediation and less on administration.',
    name: 'Sarah Chen',
    handle: 'Family Mediator',
    imageUrl: '/images/testimonial-1.avif',
  },
  {
    quote:
      'Being able to take digital notes during sessions and having them automatically organized by case has been a game-changer for my workflow.',
    name: 'Michael Rodriguez',
    handle: 'Commercial Mediator',
    imageUrl: '/images/testimonial-2.avif',
  },
  {
    quote:
      'The automated invoicing and payment system has significantly reduced the time I spend on billing. My clients appreciate the professional experience.',
    name: 'Emma Thompson',
    handle: 'Workplace Mediator',
    imageUrl: '/images/testimonial-3.avif',
  },
  {
    quote:
      'As a community mediator, I love how the platform helps me stay organized with multiple cases. The email notifications keep everyone in the loop.',
    name: 'David Park',
    handle: 'Community Mediator',
    imageUrl: '/images/testimonial-4.avif',
  },
  {
    quote:
      'The analytics dashboard gives me valuable insights into my practice. I can track my success rates and identify areas for growth.',
    name: 'Rachel Foster',
    handle: 'Civil Mediator',
    imageUrl: '/images/testimonial-5.avif',
  },
  {
    quote:
      'The platform is intuitive and customizable to my needs. It has helped me scale my mediation practice while maintaining quality service.',
    name: 'James Wilson',
    handle: 'Elder Care Mediator',
    imageUrl: '/images/testimonial-6.avif',
  },
]
