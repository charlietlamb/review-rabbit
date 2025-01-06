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

const transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
}

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...transition,
      delay: 0.1 * custom,
    },
  }),
}

const WorkflowIcon = () => {
  const controls = useAnimation()
  const { open } = useSidebar()

  const svgContent = (
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
      <motion.rect
        width="8"
        height="8"
        x="3"
        y="3"
        rx="2"
        variants={variants}
        animate={controls}
        custom={0}
      />
      <motion.path
        d="M7 11v4a2 2 0 0 0 2 2h4"
        variants={variants}
        animate={controls}
        custom={3}
      />
      <motion.rect
        width="8"
        height="8"
        x="13"
        y="13"
        rx="2"
        variants={variants}
        animate={controls}
        custom={0}
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
          <TooltipTrigger>{svgContent}</TooltipTrigger>
          <TooltipContent>Workflows</TooltipContent>
        </Tooltip>
      ) : (
        svgContent
      )}
      <p className={cn(iconTextClassName, !open && 'hidden')}>Workflows</p>
    </div>
  )
}

export { WorkflowIcon }
