import { TestimonialCard } from './testimonial-card'
import { testimonials } from './testimonial-data'
import Balancer from 'react-wrap-balancer'

export function Testimonials() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-background to-background" />
      <div className="container relative flex flex-col items-center gap-8 py-24 sm:py-32">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-primary font-bold text-center uppercase">
            Customer Stories
          </span>
          <Balancer>
            <h2 className="font-heading max-w-2xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Loved by Businesses Worldwide
            </h2>
          </Balancer>
        </div>
        <p className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          Join thousands of businesses who have transformed their online
          presence with authentic customer reviews.
        </p>
        <div className="grid gap-8 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
