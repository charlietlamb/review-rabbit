import { testimonials } from './testimonials/testimonial-data'
import { TestimonialCard } from './testimonials/testimonial-card'

export function Testimonials() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          Testimonials
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          What our users say
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-lg text-center">
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
