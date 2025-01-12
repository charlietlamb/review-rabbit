import { CompanyLogo } from './company-logo'
import { companies } from './social-proof-data'
import Balancer from 'react-wrap-balancer'

export function SocialProof() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="container relative flex flex-col items-center gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center">
          <span className="text-primary font-bold text-center uppercase">
            Trusted By Leaders
          </span>
          <Balancer>
            <h2 className="font-heading max-w-2xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Companies That Trust Us
            </h2>
          </Balancer>
        </div>

        <p className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          Join thousands of successful businesses who use our platform to manage
          their online reputation.
        </p>

        {/* Logos */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 items-center justify-items-center">
            {companies.map((company) => (
              <div
                key={company.src}
                className="w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <CompanyLogo src={company.src} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
