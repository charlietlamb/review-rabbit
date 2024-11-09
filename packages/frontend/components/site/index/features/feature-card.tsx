import { LucideIcon } from 'lucide-react'

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  position: 'top' | 'bottom'
  className?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  position,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={`group/feature relative flex flex-col py-10 ${className}`}>
      <div
        className={`pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 ${
          position === 'top' ? 'bg-gradient-to-t' : 'bg-gradient-to-b'
        }`}
      />
      <div className="relative z-10 mb-4 px-10">
        <Icon size={24} className="text-primary" />
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
        <span className="inline-block">{title}</span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
