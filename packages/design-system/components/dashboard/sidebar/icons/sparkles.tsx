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

const variants: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    y: 0,
  },
  animate: {
    scale: [1, 1.04, 1],
    rotate: [0, -8, 8, -8, 0],
    y: [0, -2, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      times: [0, 0.2, 0.5, 0.8, 1],
    },
  },
}

const SparklesIcon = () => {
  const controls = useAnimation()
  const { open } = useSidebar()

  const iconSvg = (
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
      variants={variants}
      animate={controls}
      className={iconClassName}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </motion.svg>
  )

  return (
    <div
      className={iconWrapClassName}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      {!open ? (
        <Tooltip>
          <TooltipTrigger>{iconSvg}</TooltipTrigger>
          <TooltipContent>Reviews</TooltipContent>
        </Tooltip>
      ) : (
        iconSvg
      )}
      <p className={cn(iconTextClassName, !open && 'hidden')}>Reviews</p>
    </div>
  )
}

export { SparklesIcon }
