import HeroImage from './hero-image'
import HeroPitch from './hero-pitch'
import { HeroText } from './hero-text'
import HeroActions from './hero-actions'

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-8 pb-28 h-screen sm:gap-10 z-10 w-full mb-20 md:mb-40 lg:mb-60 xl:mb-96 2xl:mb-[480px]">
      <div className="flex flex-col items-center px-32 grid-cols-1 justify-center flex-grow">
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <HeroText />
          <HeroActions />
        </div>
        <HeroPitch />
      </div>
      <HeroImage />
    </section>
  )
}
