'use client'

import type { Variants } from 'motion/react'
import { motion, useAnimation } from 'motion/react'
import {
  iconClassName,
  iconTextClassName,
  iconWrapClassName,
} from './class-names'
import { useSidebar } from '@remio/design-system/components/ui/sidebar'
import { cn } from '@remio/design-system/lib/utils'
const dotVariants: Variants = {
  normal: {
    opacity: 1,
  },
  animate: (custom: number) => ({
    opacity: [1, 0, 0, 1, 1, 0, 0, 1],
    transition: {
      opacity: {
        times: [
          0,
          0.1,
          0.1 + custom * 0.1,
          0.1 + custom * 0.1 + 0.1,
          0.5,
          0.6,
          0.6 + custom * 0.1,
          0.6 + custom * 0.1 + 0.1,
        ],
        duration: 1.5,
      },
    },
  }),
}

const MessageCircleMoreIcon = () => {
  const controls = useAnimation()
  const { open } = useSidebar()

  return (
    <div
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      className={iconWrapClassName}
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
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <motion.path
          d="M8 12h.01"
          variants={dotVariants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M12 12h.01"
          variants={dotVariants}
          animate={controls}
          custom={1}
        />
        <motion.path
          d="M16 12h.01"
          variants={dotVariants}
          animate={controls}
          custom={2}
        />
      </svg>
      <span className={cn(iconTextClassName, !open && 'hidden')}>
        Mediations
      </span>
    </div>
  )
}

export { MessageCircleMoreIcon }
