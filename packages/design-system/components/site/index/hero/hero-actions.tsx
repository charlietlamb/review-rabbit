import React from 'react'
import { Button } from '@dubble/design-system/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HeroActions() {
  return (
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
  )
}
