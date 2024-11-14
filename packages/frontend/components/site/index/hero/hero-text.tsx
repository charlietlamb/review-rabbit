import { ArrowRight } from 'lucide-react'

export function HeroText() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex cursor-pointer items-center gap-1 rounded-full border bg-primary/50 px-3 py-0.5 hover:bg-primary/60 transition-colors">
        <span className="text-sm text-secondary-foreground">
          Try our new model for free
        </span>
        <ArrowRight size={16} className="text-foreground" />
      </div>
      <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl tracking-tight text-foreground">
        Reach a global audience within minutes
      </h1>
      <p className="max-w-lg text-center text-lg text-muted-foreground sm:text-xl">
        Translate your videos into 30+ languages, make your reach worldwide.
      </p>
    </div>
  )
}
