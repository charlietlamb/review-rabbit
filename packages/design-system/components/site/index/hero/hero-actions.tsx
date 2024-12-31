'use client'

import { Button } from '@rabbit/design-system/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HeroActions() {
  const router = useRouter()
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
        className="font-heading text-lg"
        onClick={() => router.push('/signup')}
      >
        Get Started
      </Button>
    </div>
  )
}
