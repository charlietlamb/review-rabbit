import Link from 'next/link'

import { Button } from '@remio/design-system/components/ui/button'

export function CtaSection() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-10">
      <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance max-w-xl sm:leading-tight text-center text-foreground">
        Code at the speed of no-code
      </h2>
      <p className="text-lg text-muted-foreground text-balance max-w-lg text-center">
        Build at the speed of no-code. Export to Next.js and Tailwind code.
        Customize without limits.
      </p>
      <Button
        size="lg"
        asChild
        variant="gooeyLeft"
        className="cursor-pointer border-border"
      >
        <Link href="#">Get Started</Link>
      </Button>
    </section>
  )
}
