import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-8 pb-28 pt-20 sm:gap-10">
      <div className="flex cursor-pointer items-center gap-1 rounded-full border bg-secondary px-3 py-0.5 hover:bg-secondary/60">
        <span className="text-sm text-secondary-foreground">
          Announcing our seed round
        </span>
        <ArrowRight size={16} />
      </div>
      <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl tracking-tight">
        Build beautiful landing pages in minutes with remio
      </h1>
      <p className="max-w-lg text-center text-lg text-muted-foreground sm:text-xl">
        Build at the speed of no-code. Export to Next.js & Tailwind code and
        customize without limits.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button
          size="lg"
          asChild
          variant="outline"
          className="cursor-pointer border-border"
        >
          <Link href="#">Learn More</Link>
        </Button>
        <Button size="lg" asChild className="cursor-pointer">
          <Link href="#">Get Started</Link>
        </Button>
      </div>
      <div className="relative sm:mt-8">
        <Image
          alt="SaaS Dashboard"
          src="/images/dashboard.png"
          width={1000}
          height={698}
          priority
          className="rounded-xl border border-border shadow-lg"
        />
        <div className="absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]" />
      </div>
    </section>
  )
}
