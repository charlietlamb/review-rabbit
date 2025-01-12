'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { featuresData } from './features-data'
import { FeatureIcon, FeatureContent } from './feature-card'

const AUTO_PLAY_INTERVAL = 5000 // 5 seconds
const AUTO_PLAY_RESET_DELAY = 30000 // 30 seconds

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [lastInteraction, setLastInteraction] = useState<number | null>(null)

  const nextFeature = useCallback(() => {
    setActiveFeature((current) => (current + 1) % featuresData.length)
  }, [])

  // Handle auto-play
  useEffect(() => {
    let intervalId: number

    const shouldAutoPlay =
      !lastInteraction || Date.now() - lastInteraction > AUTO_PLAY_RESET_DELAY

    if (shouldAutoPlay) {
      intervalId = window.setInterval(nextFeature, AUTO_PLAY_INTERVAL)
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [lastInteraction, nextFeature])

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index)
    setLastInteraction(Date.now())
  }

  return (
    <section className="container flex flex-col items-center gap-10 py-24">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="text-primary font-bold text-center uppercase">
          Features
        </span>
        <h2 className="font-heading sm:text-4xl text-balance text-3xl font-semibold tracking-tight text-center text-foreground">
          Powerful Review Management
        </h2>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-balance max-w-2xl text-lg text-center">
        Our platform combines intelligent review management with powerful
        automation, giving you everything you need to grow your online
        reputation effectively.
      </p>

      {/* Feature Navigation */}
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {featuresData.map((feature, index) => (
          <FeatureIcon
            key={feature.title}
            icon={feature.icon}
            isActive={activeFeature === index}
            onClick={() => handleFeatureClick(index)}
          />
        ))}
      </div>

      <div className="relative w-full max-w-4xl h-[160px]">
        <AnimatePresence mode="wait">
          <FeatureContent
            key={activeFeature}
            feature={featuresData[activeFeature]}
          />
        </AnimatePresence>
      </div>
    </section>
  )
}
