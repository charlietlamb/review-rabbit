'use client'

import type { AnimationControls, Transition, Variant } from 'motion/react'
import { motion, useAnimation } from 'motion/react'

export default function ImageIcon({
  controls,
  transition,
}: {
  controls: AnimationControls
  transition: Transition
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.line
        variants={{
          animate: { translateY: -4 },
          normal: {
            translateX: 0,
            rotate: 0,
            translateY: 0,
          },
        }}
        animate={controls}
        transition={transition}
        x1={22}
        x2={2}
        y1={6}
        y2={6}
      />
      <motion.line
        variants={{
          animate: { translateY: 4 },
          normal: {
            translateX: 0,
            rotate: 0,
            translateY: 0,
          },
        }}
        animate={controls}
        transition={transition}
        x1={22}
        x2={2}
        y1={18}
        y2={18}
      />
      <motion.line
        variants={{
          animate: { translateX: -4 },
          normal: {
            translateX: 0,
            rotate: 0,
            translateY: 0,
          },
        }}
        animate={controls}
        transition={transition}
        x1={6}
        x2={6}
        y1={2}
        y2={22}
      />
      <motion.line
        variants={{
          animate: { translateX: 4 },
          normal: {
            translateX: 0,
            rotate: 0,
            translateY: 0,
          },
        }}
        animate={controls}
        transition={transition}
        x1={18}
        x2={18}
        y1={2}
        y2={22}
      />
    </svg>
  )
}
