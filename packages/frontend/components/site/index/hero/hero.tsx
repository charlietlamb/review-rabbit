import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HeroImage from './hero-image'
import HeroPitch from './hero-pitch'
import { HeroText } from './hero-text'

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-8 pb-28 min-h-screen pt-28 sm:gap-10 z-10 w-full mb-60">
      <HeroText />
      <div className="flex gap-3">
        <Button
          size="lg"
          variant="expandIcon"
          colors="outline"
          Icon={ArrowRight}
          iconPlacement="right"
          className="font-heading text-lg"
        >
          Learn More
        </Button>
        <Button
          size="lg"
          variant="shine"
          colors="none"
          className="font-heading text-lg hover:text-white"
        >
          Get Started
        </Button>
      </div>
      <HeroPitch />
      <HeroImage />
    </section>
  )
}
