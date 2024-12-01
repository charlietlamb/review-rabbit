import HeroImage from './hero-image'
import HeroPitch from './hero-pitch'
import { HeroText } from './hero-text'
import HeroActions from './hero-actions'

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-8 pb-28 h-screen sm:gap-10 z-10 w-full mb-40">
      <div className="grid gap-16 items-center px-32 grid-cols-1 place-items-center flex-grow">
        <div className="flex flex-col gap-4 items-center justify-center h-full pt-[25%]">
          <HeroText />
          <HeroActions />
        </div>
        <HeroPitch />
      </div>
      <HeroImage />
    </section>
  )
}
