import { cn } from '@rabbit/design-system/lib/utils'
import { Marquee } from '@rabbit/design-system/components/magic/marquee'
import { faker } from '@faker-js/faker'

const realPeople = [
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

const reviewTemplates = [
  'Our Google rating improved from {start} to {end} stars in just {time}. {feature}',
  'Saw a {percent}% increase in positive reviews since implementing the system. {feature}',
  '{feature} Our review response time dropped from days to minutes.',
  'Customer satisfaction improved dramatically. {feature} Our rating went up {increase} stars.',
  'The AI responses helped us maintain {score} stars consistently. {feature}',
]

const features = [
  'The automated review responses save us hours every week.',
  'The review management dashboard is incredibly intuitive.',
  'The AI-powered response system is a game-changer.',
  'We love how it helps us identify service issues quickly.',
  'Managing customer feedback has never been easier.',
  'The personalized responses keep our customers engaged.',
]

function generateReview(person: (typeof realPeople)[0]) {
  const template = faker.helpers.arrayElement(reviewTemplates)
  const feature = faker.helpers.arrayElement(features)

  const startRating = Number(
    faker.number.float({ min: 3.0, max: 4.0, fractionDigits: 1 })
  )
  const endRating = Number(
    faker.number.float({ min: 4.2, max: 5.0, fractionDigits: 1 })
  )
  const timeFrames = ['2 months', '3 months', '6 weeks', '90 days']
  const increase = (endRating - startRating).toFixed(1)

  const body = template
    .replace('{start}', startRating.toString())
    .replace('{end}', endRating.toString())
    .replace('{time}', faker.helpers.arrayElement(timeFrames))
    .replace('{feature}', feature)
    .replace('{percent}', faker.number.int({ min: 30, max: 80 }).toString())
    .replace('{score}', endRating.toString())
    .replace('{increase}', increase)

  return {
    name: person.name,
    username: `${person.business} ${person.type}`,
    body,
    img: person.image,
  }
}

const reviews = realPeople.map(generateReview)

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-lg p-6 border bg-card'
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img
          className="rounded-full object-cover"
          width="48"
          height="48"
          alt={`${name}'s profile picture`}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-foreground">
            {name}
          </figcaption>
          <p className="text-xs text-muted-foreground">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed">{body}</blockquote>
    </figure>
  )
}

export function HeroTestimonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg z-20">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  )
}
