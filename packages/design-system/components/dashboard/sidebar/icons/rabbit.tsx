'use client'

import type { Transition, Variants } from 'motion/react'
import { motion, useAnimation } from 'motion/react'
import {
  iconClassName,
  iconTextClassName,
  iconWrapClassName,
} from './class-names'
import { useSidebar } from '@rabbit/design-system/components/ui/sidebar'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@rabbit/design-system/components/ui/tooltip'
import { cn } from '@rabbit/design-system/lib/utils'

const transition: Transition = {
  duration: 0.6,
  ease: [0.42, 0, 0.58, 1],
}

const speedVariants: Variants = {
  normal: {
    rotate: 0,
    x: 0,
    y: 0,
  },
  animate: {
    rotate: [0, 5, -5, 3, -3, 0],
    x: [0, 3, -3, 2, -2, 0],
    y: [0, 1.5, -1.5, 1, -1, 0],
    transition,
  },
}

const RabbitIcon = () => {
  const controls = useAnimation()
  const { open } = useSidebar()

  return (
    <div
      className={iconWrapClassName}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      {open ? (
        <>
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
            variants={speedVariants}
            animate={controls}
            className={iconClassName}
          >
            <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
            <path d="M13 16a3 3 0 0 1 2.24 5" />
            <path d="M18 12h.01" />
            <path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
            <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
          </motion.svg>
          <p className={cn(iconTextClassName, !open && 'hidden')}>
            Automations
          </p>
        </>
      ) : (
        <Tooltip>
          <TooltipTrigger>
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
              variants={speedVariants}
              animate={controls}
              className={iconClassName}
            >
              <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
              <path d="M13 16a3 3 0 0 1 2.24 5" />
              <path d="M18 12h.01" />
              <path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
              <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
            </motion.svg>
          </TooltipTrigger>
          <TooltipContent>Automations</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export { RabbitIcon }
