import {
  Frame,
  Gauge,
  Download,
  Globe,
  Sparkles,
  LayoutDashboard,
  Palette,
  CodeXml,
} from 'lucide-react'

export function Features() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          Features
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          Build fast and stay flexible
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">
        remio brings the best of two worlds together: the speed of development
        of no-code tools, and the flexibility of code.
      </p>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="group/feature relative flex flex-col py-10 lg:border-r lg:border-l lg:border-b">
          <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-t" />
          <div className="relative z-10 mb-4 px-10">
            <Frame size={24} className="text-primary" />
          </div>
          <div className="relative z-10 mb-2 px-10 text-lg font-bold">
            <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
            <span className="inline-block">Visual Builder</span>
          </div>
          <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
            Edit HTML, Tailwind & React components visually.
          </p>
        </div>
        <div className="group/feature relative flex flex-col py-10 lg:border-r lg:border-b">
          <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-t" />
          <div className="relative z-10 mb-4 px-10">
            <Gauge size={24} className="text-primary" />
          </div>
          <div className="relative z-10 mb-2 px-10 text-lg font-bold">
            <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
            <span className="inline-block">Ease of use</span>
          </div>
          <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
            No new mental models to learn. It feels like magic.
          </p>
        </div>
        <div className="group/feature relative flex flex-col py-10 lg:border-r lg:border-b">
          <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-t" />
          <div className="relative z-10 mb-4 px-10">
            <Download size={24} className="text-primary" />
          </div>
          <div className="relative z-10 mb-2 px-10 text-lg font-bold">
            <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
            <span className="inline-block">Code Export</span>
          </div>
          <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
            Export your website to a Next.js & Tailwind app.
          </p>
        </div>
        <div className="group/feature relative flex flex-col py-10 lg:border-r lg:border-b">
          <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-t" />
          <div className="relative z-10 mb-4 px-10">
            <Globe size={24} className="text-primary" />
          </div>
          <div className="relative z-10 mb-2 px-10 text-lg font-bold">
            <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
            <span className="inline-block">No lock-in</span>
          </div>
          <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
            Customize without limitations and host anywhere.
          </p>
        </div>
        <div className="group/feature relative flex flex-col py-10 lg:border-r lg:border-l">
          <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-b" />
          <div className="relative z-10 mb-4 px-10">
            <Sparkles size={24} className="text-primary" />
          </div>
          <div className="relative z-10 mb-2 px-10 text-lg font-bold">
            <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
            <span className="inline-block">Modern tech stack</span>
          </div>
          <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
            Works with Next.js, Tailwind and Shadcn UI.
          </p>
        </div>
        <div className="group/feature relative flex flex-col py-10 lg:border-r">
          <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-b" />
          <div className="relative z-10 mb-4 px-10">
            <LayoutDashboard size={24} className="text-primary" />
          </div>
          <div className="relative z-10 mb-2 px-10 text-lg font-bold">
            <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
            <span className="inline-block">Pre-made templates</span>
          </div>
          <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
            Get started quickly with ready templates and sections.
          </p>
        </div>
        <div className="group/feature relative flex flex-col py-10 lg:border-r">
          <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-b" />
          <div className="relative z-10 mb-4 px-10">
            <Palette size={24} className="text-primary" />
          </div>
          <div className="relative z-10 mb-2 px-10 text-lg font-bold">
            <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
            <span className="inline-block">AI Theme Generation</span>
          </div>
          <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
            Generate beautiful themes and color palettes with AI.
          </p>
        </div>
        <div className="group/feature relative flex flex-col py-10 lg:border-r">
          <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-b" />
          <div className="relative z-10 mb-4 px-10">
            <CodeXml size={24} className="text-primary" />
          </div>
          <div className="relative z-10 mb-2 px-10 text-lg font-bold">
            <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
            <span className="inline-block">Built for developers</span>
          </div>
          <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
            remio is built by developers for developers.
          </p>
        </div>
      </div>
    </section>
  )
}
