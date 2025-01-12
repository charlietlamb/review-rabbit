'use client'

import HeroActions from './hero-actions'
import { HeroText } from './hero-text'
import { AnimatedGridPattern } from '@rabbit/design-system/components/magic/animated-grid-pattern'
import { cn } from '@rabbit/design-system/lib/utils'
import HeroAvatars from './hero-avatars'
import { HeroTestimonials } from './hero-testimonials'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
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

export function Hero() {
  return (
    <section className="relative z-10 w-full min-h-screen overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 grid-cols-1 items-center min-h-screen gap-16 lg:gap-0"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center pt-[20vh] lg:pt-0 lg:items-start justify-center h-full gap-4 padding-left-main"
        >
          <HeroText />
          <motion.div variants={itemVariants}>
            <HeroActions />
          </motion.div>
          <motion.div variants={itemVariants}>
            <HeroAvatars />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative z-10">
          <HeroTestimonials />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <AnimatedGridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_left,hsl(var(--background)),transparent,transparent)] min-h-screen'
        )}
      />
    </section>
  )
}
