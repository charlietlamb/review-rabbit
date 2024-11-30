'use client'

import { AnimationControls, motion, Variants } from 'motion/react'

export default function StoryIcon({
  controls,
  variants,
}: {
  controls: AnimationControls
  variants: Variants
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
      <circle cx="12" cy="12" r="4" />
      {[
        'M12 2v2',
        'm19.07 4.93-1.41 1.41',
        'M20 12h2',
        'm17.66 17.66 1.41 1.41',
        'M12 20v2',
        'm6.34 17.66-1.41 1.41',
        'M2 12h2',
        'm4.93 4.93 1.41 1.41',
      ].map((d, index) => (
        <motion.path
          key={d}
          d={d}
          animate={controls}
          variants={variants}
          custom={index + 1}
        />
      ))}
    </svg>
  )
}
