import { ArrowRight } from 'lucide-react'

export function HeroText() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex cursor-pointer items-center gap-1 rounded-full border bg-background px-3 py-0.5 hover:bg-white transition-colors">
        <span className="text-sm text-secondary-foreground font-heading">
          Start creating flows for free
        </span>
        <ArrowRight size={16} className="text-foreground" />
      </div>
      <h1 className="max-w-2xl font-heading text-4xl font-semibold sm:text-5xl tracking-tight text-foreground text-center ">
        Social media scheduling from the future
      </h1>
      <p className="max-w-lg text-center text-lg text-muted-foreground sm:text-xl">
        Create custom workflows that make social media scheduling a breeze.
      </p>
    </div>
  )
}
