'use client'

import type { Variants } from 'motion/react'
import { motion, useAnimation } from 'motion/react'
import { cn } from '@burse/design-system/lib/utils'
import { iconWrapClassName } from './class-names'
import { iconClassName } from './class-names'
import { iconTextClassName } from './class-names'
import { useSidebar } from '@burse/design-system/components/ui/sidebar'

const pathVariants: Variants = {
  initial: { pathLength: 1, pathOffset: 0, rotate: 0 },
  animate: {
    pathLength: [1, 0.97, 1, 0.97, 1],
    pathOffset: [0, 0.05, 0, 0.05, 0],
    rotate: [0, -5, 0],
    transition: {
      rotate: {
        duration: 0.5,
      },
      duration: 1,
      times: [0, 0.2, 0.4, 0.6, 1],
      ease: 'easeInOut',
    },
  },
}

const LinkIcon = () => {
  const controls = useAnimation()
  const { open } = useSidebar()

  return (
    <div
      className={iconWrapClassName}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
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
        className={iconClassName}
      >
        <motion.path
          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          variants={pathVariants}
          animate={controls}
        />
        <motion.path
          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          variants={pathVariants}
          animate={controls}
        />
      </svg>
      <p className={cn(iconTextClassName, !open && 'hidden')}>Connect</p>
    </div>
  )
}

export { LinkIcon }
