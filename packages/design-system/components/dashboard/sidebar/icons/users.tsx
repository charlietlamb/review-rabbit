'use client'

import type { Variants } from 'motion/react'
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

const pathVariants: Variants = {
  normal: {
    translateX: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 13,
    },
  },
  animate: {
    translateX: [-6, 0],
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 200,
      damping: 13,
    },
  },
}

const UsersIcon = () => {
  const controls = useAnimation()
  const { open } = useSidebar()

  const iconContent = (
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <motion.path
        d="M22 21v-2a4 4 0 0 0-3-3.87"
        variants={pathVariants}
        animate={controls}
      />
      <motion.path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        variants={pathVariants}
        animate={controls}
      />
    </svg>
  )

  return (
    <div
      className={iconWrapClassName}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      {!open ? (
        <Tooltip>
          <TooltipTrigger>{iconContent}</TooltipTrigger>
          <TooltipContent>Clients</TooltipContent>
        </Tooltip>
      ) : (
        iconContent
      )}
      <p className={cn(iconTextClassName, !open && 'hidden')}>Clients</p>
    </div>
  )
}

export { UsersIcon }
