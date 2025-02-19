'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { featuresData } from './features-data'
import { FeatureIcon, FeatureContent } from './feature-card'
import Balancer from 'react-wrap-balancer'

const AUTO_PLAY_INTERVAL = 5000 // 5 seconds
const AUTO_PLAY_RESET_DELAY = 30000 // 30 seconds

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

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
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="container relative flex flex-col items-center gap-6 sm:gap-8 lg:gap-10"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:gap-4 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-primary font-bold text-center uppercase text-sm sm:text-base"
          >
            Review Management
          </motion.span>
          <Balancer>
            <motion.h2
              variants={itemVariants}
              className="font-heading max-w-2xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent"
            >
              Everything You Need to Grow
            </motion.h2>
          </Balancer>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-center text-base sm:text-lg lg:text-xl text-muted-foreground"
        >
          Our platform combines intelligent review management with powerful
          automation, helping you build a stellar online reputation
          effortlessly.
        </motion.p>

        {/* Feature Navigation */}
        <motion.div
          variants={containerVariants}
          className="relative w-full max-w-[85rem] px-4 sm:px-6"
        >
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 sm:gap-4 max-w-lg sm:max-w-none mx-auto"
          >
            {featuresData.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={iconVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center"
              >
                <FeatureIcon
                  icon={feature.icon}
                  isActive={activeFeature === index}
                  onClick={() => handleFeatureClick(index)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Content */}
          <div className="mt-8 sm:mt-10 lg:mt-12 min-h-[200px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <FeatureContent
                key={activeFeature}
                feature={featuresData[activeFeature]}
              />
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 h-1 bg-border/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{
                width: `${((activeFeature + 1) / featuresData.length) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
