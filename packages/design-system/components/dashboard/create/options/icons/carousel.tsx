'use client'

import type { AnimationControls, Variants } from 'motion/react'
import { motion } from 'motion/react'

export default function CarouselIcon({
  controls,
  variants,
  subVariants,
}: {
  controls: AnimationControls
  variants: Variants
  subVariants: Variants
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        variants={variants}
        animate={controls}
        transition={{
          delay: 0.3,
          duration: 0.4,
        }}
        d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
      />
      <motion.path
        d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
        variants={variants}
        animate={controls}
        transition={{
          delay: 0.2,
          duration: 0.2,
        }}
      />
      <motion.rect
        variants={subVariants}
        width="8"
        height="8"
        x="14"
        y="14"
        rx="2"
        animate={controls}
      />
    </svg>
  )
}
