'use client'

import { motion, useAnimation } from 'framer-motion'
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

const NotebookIcon = () => {
  const controls = useAnimation()
  const { open } = useSidebar()

  const iconSvg = (
    <motion.svg
      animate={controls}
      variants={{
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
        normal: {
          scale: 1,
          rotate: 0,
          y: 0,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={iconClassName}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      <path d="M8 11h8" />
      <path d="M8 7h6" />
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
          <TooltipContent>Businesses</TooltipContent>
        </Tooltip>
      ) : (
        iconSvg
      )}
      <p className={cn(iconTextClassName, !open && 'hidden')}>Businesses</p>
    </div>
  )
}

export { NotebookIcon }
