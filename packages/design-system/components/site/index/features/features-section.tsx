import { FeatureCard } from './feature-card'
import { featuresData } from './features-data'

export function Features() {
  return (
    <section className="sm:gap-7 container flex flex-col items-center gap-6 py-24">
      <div className="flex flex-col gap-3">
        <span className="text-primary font-bold text-center uppercase">
          Features
        </span>
        <h2 className="font-heading sm:text-4xl text-balance text-3xl font-semibold tracking-tight text-center text-foreground">
          Powerful Payment Infrastructure
        </h2>
      </div>
      <p className="text-muted-foreground text-balance max-w-2xl text-lg text-center">
        Our platform combines Stripe's robust payment processing with automated
        webhook handling, giving you everything you need to manage payments
        effectively.
      </p>
      <div className="max-w-7xl md:grid-cols-2 lg:grid-cols-4 relative z-10 grid grid-cols-1 py-10 mx-auto">
        {featuresData.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}
