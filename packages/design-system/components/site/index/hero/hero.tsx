import HeroActions from './hero-actions'
import { HeroText } from './hero-text'
import { AnimatedGridPattern } from '@rabbit/design-system/components/magic/animated-grid-pattern'
import { cn } from '@rabbit/design-system/lib/utils'
import HeroAvatars from './hero-avatars'
import { HeroTestimonials } from './hero-testimonials'

export function Hero() {
  return (
    <section className="relative z-10 w-full min-h-screen overflow-hidden">
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center min-h-screen gap-16 lg:gap-0">
        <div className="flex flex-col items-center pt-[20vh] lg:pt-0 lg:items-start justify-center h-full gap-4 padding-left-main">
          <HeroText />
          <HeroActions />
          <HeroAvatars />
        </div>
        <HeroTestimonials />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <AnimatedGridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_left,hsl(var(--background)),transparent,transparent)] '
        )}
      />
    </section>
  )
}
