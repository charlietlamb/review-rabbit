'use client'

import { AnimationControls, motion, Variants } from 'motion/react'

export default function VideoIcon({
  controls,
  variants,
}: {
  controls: AnimationControls
  variants: Variants
}) {
  return (
    <div className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center">
      <motion.svg
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
        <motion.polygon
          points="6 3 20 12 6 21 6 3"
          variants={variants}
          animate={controls}
        />
      </motion.svg>
    </div>
  )
}
