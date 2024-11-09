import { TestimonialCard } from './testimonial-card'
import { testimonials } from './testimonial-data'

export function Testimonials() {
  return (
    <section className="sm:gap-7 container flex flex-col items-center gap-6 py-24">
      <div className="flex flex-col gap-3">
        <span className="text-primary font-bold text-center uppercase">
          Testimonials
        </span>
        <h2 className="font-heading sm:text-4xl text-balance text-3xl font-semibold tracking-tight text-center">
          What our users say
        </h2>
      </div>
      <p className="text-muted-foreground text-balance max-w-lg text-lg text-center">
        What developers and founders of top companies around the internet are
        saying about remio.
      </p>
      <div className="columns-1 gap-7 md:columns-2 lg:columns-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  )
}
