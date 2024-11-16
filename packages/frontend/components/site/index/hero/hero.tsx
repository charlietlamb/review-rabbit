import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HeroImage from './hero-image'
import HeroPitch from './hero-pitch'
import { HeroText } from './hero-text'
import HeroActions from './hero-actions'

export function Hero() {
  return (
    <section className="relative flex flex-col items-center xl:justify-center gap-8 pb-28 min-h-screen pt-28 sm:gap-10 z-10 w-full mb-60 xl:mb-20">
      <div className="grid gap-4 items-center xl:items-start px-32 grid-cols-1 mb-32 xl:mb-0 xl:grid-cols-2 place-items-center flex-grow xl:flex-grow-0">
        <div className="flex flex-col gap-4 items-center xl:items-start justify-center h-full">
          <HeroText />
          <HeroActions />
        </div>
        <HeroPitch />
      </div>
      <HeroImage />
    </section>
  )
}
