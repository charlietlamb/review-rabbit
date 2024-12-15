import { ArrowRight } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import Link from 'next/link'
export function HeroText() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex cursor-pointer items-center gap-2 rounded-full border bg-background px-4 py-1 hover:bg-white transition-colors">
        <Link
          href="/signup"
          className="text-sm text-secondary-foreground font-heading"
        >
          Start managing your mediations free
        </Link>
        <ArrowRight size={16} className="text-foreground" />
      </div>
      <h1 className="max-w-2xl font-heading text-5xl font-semibold sm:text-6xl tracking-tight text-foreground text-center">
        <Balancer>Make Mediations Effortless</Balancer>
      </h1>
      <p className="max-w-lg text-center text-lg text-muted-foreground sm:text-xl">
        Streamline your mediation processes with custom workflows tailored to
        your needs.
      </p>
    </div>
  )
}
