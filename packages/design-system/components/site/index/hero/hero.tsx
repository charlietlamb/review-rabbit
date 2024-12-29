import HeroActions from './hero-actions'
import { HeroGradient } from './hero-gradient'
import { HeroText } from './hero-text'

export function Hero() {
  return (
    <section className="sm:gap-10 relative z-10 w-full min-h-screen overflow-hidden">
      <HeroGradient />
      <div className="relative flex flex-col items-center gap-20 px-8 grid-cols-1 justify-center flex-grow pt-[25vh]">
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <HeroText />
          <HeroActions />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent" />
    </section>
  )
}
