'use client'

import type { Variants } from 'motion/react'
import { motion, useAnimation } from 'motion/react'
import {
  iconClassName,
  iconTextClassName,
  iconWrapClassName,
} from './class-names'
import { cn } from '@rabbit/design-system/lib/utils'
import { useSidebar } from '@rabbit/design-system/components/ui/sidebar'

const rectVariants: Variants = {
  normal: {
    translateY: 0,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },
  },
  animate: {
    translateY: -1.5,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },
  },
}

const pathVariants: Variants = {
  normal: { d: 'M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8' },
  animate: { d: 'M4 11v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11' },
}

const secondaryPathVariants: Variants = {
  normal: { d: 'M10 12h4' },
  animate: { d: 'M10 15h4' },
}

const ArchiveIcon = () => {
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
        <motion.rect
          width="20"
          height="5"
          x="2"
          y="3"
          rx="1"
          initial="normal"
          animate={controls}
          variants={rectVariants}
        />
        <motion.path
          d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"
          variants={pathVariants}
          animate={controls}
        />
        <motion.path
          d="M10 12h4"
          variants={secondaryPathVariants}
          animate={controls}
        />
      </svg>
      <p className={cn(iconTextClassName, !open && 'hidden')}>Products</p>
    </div>
  )
}

export { ArchiveIcon }
