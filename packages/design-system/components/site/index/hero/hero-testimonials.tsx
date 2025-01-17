import { Marquee } from '@rabbit/design-system/components/magic/marquee'
import { TestimonialCard } from '../testimonials/testimonial-card'
import { staticTestimonials } from '../testimonials/testimonial-data'

const firstRow = staticTestimonials.slice(0, staticTestimonials.length / 2)
const secondRow = staticTestimonials.slice(staticTestimonials.length / 2)

export function HeroTestimonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg z-20">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <div key={review.handle} className="mx-3 min-w-[280px] max-w-[400px]">
            <TestimonialCard
              {...review}
              showStars={false}
              reverse={true}
              showSeparator={false}
              className="h-[188px]"
            />
          </div>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <div key={review.handle} className="mx-3 min-w-[280px] max-w-[400px]">
            <TestimonialCard
              {...review}
              showStars={false}
              reverse={true}
              showSeparator={false}
              className="h-[200px]"
            />
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  )
}
