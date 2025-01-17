export interface Person {
  name: string
  business: string
  type: string
  image: string
}

export const realPeople: Person[] = [
  {
    name: 'Michael Chen',
    business: 'Golden Dragon',
    type: 'Restaurant',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=faces&auto=format&q=90',
  },
  {
    name: 'Sarah Johnson',
    business: 'Precision Auto Care',
    type: 'Auto Shop',
    image:
      'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=96&h=96&fit=crop&crop=faces&auto=format&q=90',
  },
  {
    name: 'Dr. James Wilson',
    business: 'Bright Smile',
    type: 'Dental Clinic',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=96&h=96&fit=crop&crop=faces&auto=format&q=90',
  },
  {
    name: 'Emily Rodriguez',
    business: 'Core Fitness',
    type: 'Fitness Studio',
    image:
      'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=96&h=96&fit=crop&crop=faces&auto=format&q=90',
  },
  {
    name: 'David Kim',
    business: 'Zen Garden',
    type: 'Spa & Wellness',
    image:
      'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=96&h=96&fit=crop&crop=faces&auto=format&q=90',
  },
  {
    name: 'Lisa Martinez',
    business: 'The Daily Grind',
    type: 'Coffee Shop',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=faces&auto=format&q=90',
  },
]

export const reviewTemplates = [
  'Our Google rating improved from {start} to {end} stars in just {time}. {feature}',
  'Saw a {percent}% increase in positive reviews since implementing the system. {feature}',
  '{feature} Our review response time dropped from days to minutes.',
  'Customer satisfaction improved dramatically. {feature} Our rating went up {increase} stars.',
  'The AI responses helped us maintain {score} stars consistently. {feature}',
]

export const features = [
  'The automated review responses save us hours every week.',
  'The review management dashboard is incredibly intuitive.',
  'The AI-powered response system is a game-changer.',
  'We love how it helps us identify service issues quickly.',
  'Managing customer feedback has never been easier.',
  'The personalized responses keep our customers engaged.',
]

export interface GeneratedTestimonial {
  name: string
  handle: string
  quote: string
  imageUrl: string
}

export function generateTestimonial(person: Person): GeneratedTestimonial {
  const template =
    reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)]
  const feature = features[Math.floor(Math.random() * features.length)]

  const startRating = Number((3 + Math.random()).toFixed(1))
  const endRating = Number((4.2 + Math.random() * 0.8).toFixed(1))
  const timeFrames = ['2 months', '3 months', '6 weeks', '90 days']
  const increase = (endRating - startRating).toFixed(1)

  const body = template
    .replace('{start}', startRating.toString())
    .replace('{end}', endRating.toString())
    .replace(
      '{time}',
      timeFrames[Math.floor(Math.random() * timeFrames.length)]
    )
    .replace('{feature}', feature)
    .replace('{percent}', (30 + Math.floor(Math.random() * 50)).toString())
    .replace('{score}', endRating.toString())
    .replace('{increase}', increase)

  return {
    name: person.name,
    handle: `${person.business} ${person.type}`,
    quote: body,
    imageUrl: person.image,
  }
}

// Generate static testimonials for the main testimonials section
export const staticTestimonials = realPeople.map(generateTestimonial)
