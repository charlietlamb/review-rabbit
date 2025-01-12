import Link from 'next/link'
import { Button } from '@rabbit/design-system/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
      <div className="container relative flex flex-col items-center gap-8 py-24 sm:py-32">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-primary font-bold text-center uppercase">
            Boost Your Reviews
          </span>
          <Balancer>
            <h2 className="font-heading max-w-3xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl xl:text-6xl">
              Get More Genuine Reviews, Automatically
            </h2>
          </Balancer>
        </div>
        <p className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          Our smart platform helps you collect authentic reviews from real
          customers at the perfect moment. Watch your review count grow
          naturally, without the hassle.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row mt-4">
          <Button
            size="lg"
            asChild
            variant="default"
            className="group relative px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-colors"
          >
            <Link
              href="/dashboard/onboarding"
              className="flex items-center gap-2"
            >
              Start Growing Reviews
              <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 flex items-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            <span>Automated review requests</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            <span>100% genuine reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
