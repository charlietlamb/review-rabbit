'use client'

import type { Transition, Variants } from 'motion/react'
import { motion, useAnimation } from 'motion/react'
import { cn } from '@remio/design-system/lib/utils'
import {
  iconWrapClassName,
  iconClassName,
  iconTextClassName,
} from './class-names'

const handTransition: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
}

const handVariants: Variants = {
  normal: {
    rotate: 0,
    originX: '50%',
    originY: '50%',
  },
  animate: {
    rotate: 360,
  },
}

const minuteHandTransition: Transition = {
  duration: 0.5,
  ease: 'easeInOut',
}

const minuteHandVariants: Variants = {
  normal: {
    rotate: 0,
    originX: '50%',
    originY: '50%',
  },
  animate: {
    rotate: 45,
  },
}

const ClockIcon = () => {
  const controls = useAnimation()

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
        <circle cx="12" cy="12" r="10" />
        <motion.line
          x1="12"
          y1="12"
          x2="12"
          y2="6"
          variants={handVariants}
          animate={controls}
          initial="normal"
          transition={handTransition}
        />
        <motion.line
          x1="12"
          y1="12"
          x2="16"
          y2="12"
          variants={minuteHandVariants}
          animate={controls}
          initial="normal"
          transition={minuteHandTransition}
        />
      </svg>
      <p className={cn(iconTextClassName, !open && 'hidden')}>Schedule</p>
    </div>
  )
}

export { ClockIcon }
