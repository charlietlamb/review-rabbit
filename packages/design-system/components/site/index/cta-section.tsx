import Link from 'next/link'
import { Button } from '@rabbit/design-system/components/ui/button'

export default function CtaSection() {
  return (
    <section className="container flex flex-col items-center gap-6 py-16 sm:gap-8">
      <div className="flex flex-col gap-3">
        <span className="text-primary font-bold text-center uppercase">
          Get started
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance max-w-xl sm:leading-tight text-center text-foreground">
          Start Accepting Payments Today
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">
        Set up Stripe payments and webhook handling in minutes. No complex
        integration required.
      </p>
      <div className="flex gap-4 mt-2">
        <Button size="lg" asChild variant="shine" className="cursor-pointer">
          <Link href="/dashboard/payments/new">Get Started</Link>
        </Button>
      </div>
    </section>
  )
}
