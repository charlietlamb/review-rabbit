import { LucideIcon } from 'lucide-react'
import { cn } from '@rabbit/design-system/lib/utils'
import { motion } from 'framer-motion'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureIconProps {
  icon: LucideIcon
  isActive: boolean
  onClick: () => void
}

export function FeatureIcon({
  icon: Icon,
  isActive,
  onClick,
}: FeatureIconProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex items-center justify-center rounded-xl border transition-all duration-300',
        'h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16',
        'hover:scale-105 hover:border-primary/50 hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isActive
          ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary)_/_0.15)]'
          : 'border-border bg-card'
      )}
    >
      <Icon
        size={20}
        className={cn(
          'transition-all duration-300 sm:w-6 sm:h-6 md:w-7 md:h-7',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground group-hover:text-primary'
        )}
      />
      {isActive && (
        <motion.div
          layoutId="activeFeature"
          className="absolute -inset-px rounded-xl border-2 border-primary"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  )
}

interface FeatureContentProps {
  feature: Feature
}

export function FeatureContent({ feature }: FeatureContentProps) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
      className="w-full flex flex-col sm:flex-row items-start gap-6"
    >
      <div className="rounded-2xl bg-primary/10 p-4 md:p-6 flex-shrink-0">
        <Icon size={36} className="text-primary md:w-12 md:h-12 w-9 h-9" />
      </div>
      <div className="flex flex-col items-start gap-2 md:gap-4">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          {feature.title}
        </h3>
        <p className="max-w-3xl text-base md:text-lg text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}
