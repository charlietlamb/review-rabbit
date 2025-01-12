'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { featuresData } from './features-data'
import { FeatureIcon, FeatureContent } from './feature-card'
import Balancer from 'react-wrap-balancer'

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
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="container relative flex flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center">
          <span className="text-primary font-bold text-center uppercase">
            Review Management
          </span>
          <Balancer>
            <h2 className="font-heading max-w-2xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Everything You Need to Grow
            </h2>
          </Balancer>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          Our platform combines intelligent review management with powerful
          automation, helping you build a stellar online reputation
          effortlessly.
        </p>

        {/* Feature Navigation */}
        <div className="relative w-full max-w-5xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8 px-4">
            {featuresData.map((feature, index) => (
              <FeatureIcon
                key={feature.title}
                icon={feature.icon}
                isActive={activeFeature === index}
                onClick={() => handleFeatureClick(index)}
              />
            ))}
          </div>

          {/* Feature Content */}
          <div className="relative mt-12 h-[160px] w-full">
            <AnimatePresence mode="wait">
              <FeatureContent
                key={activeFeature}
                feature={featuresData[activeFeature]}
              />
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-border/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-[5000ms] ease-linear"
              style={{
                width: `${((activeFeature + 1) / featuresData.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
