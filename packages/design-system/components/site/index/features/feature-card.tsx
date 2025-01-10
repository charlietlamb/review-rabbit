import {
  LucideIcon,
  Star,
  MessageSquare,
  TrendingUp,
  Bell,
  Zap,
  BarChart,
  Settings,
  Users,
} from 'lucide-react'
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
        'group relative flex h-16 w-16 items-center justify-center rounded-xl border transition-all duration-200 hover:border-primary/50',
        isActive ? 'border-primary bg-primary/5' : 'border-border'
      )}
    >
      <Icon
        size={24}
        className={cn(
          'transition-colors duration-200',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground group-hover:text-primary'
        )}
      />
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
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex items-start justify-center text-center gap-8"
    >
      <div className="mb-6 rounded-full bg-primary/10 p-4">
        <Icon size={32} className="text-primary" />
      </div>
      <div className="flex flex-col items-start text-left">
        <h3 className="mb-4 text-2xl font-bold text-foreground">
          {feature.title}
        </h3>
        <p className="max-w-xl text-lg text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}
