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
        'group relative flex h-16 w-16 items-center justify-center rounded-xl border transition-all duration-300',
        'hover:scale-105 hover:border-primary/50 hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isActive
          ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary)_/_0.15)]'
          : 'border-border bg-card'
      )}
    >
      <Icon
        size={24}
        className={cn(
          'transition-all duration-300',
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
      className="absolute inset-0 flex items-start gap-12 px-4"
    >
      <div className="rounded-2xl bg-primary/10 p-6">
        <Icon size={48} className="text-primary" />
      </div>
      <div className="flex flex-col items-start gap-4">
        <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
        <p className="max-w-3xl text-lg text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}
