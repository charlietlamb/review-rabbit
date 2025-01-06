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

const DollarIcon = () => {
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
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
          <TooltipContent>Billing</TooltipContent>
        </Tooltip>
      ) : (
        iconSvg
      )}
      <p className={cn(iconTextClassName, !open && 'hidden')}>Billing</p>
    </div>
  )
}

export { DollarIcon }
