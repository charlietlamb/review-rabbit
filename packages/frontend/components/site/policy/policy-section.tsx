import type { LucideIcon } from 'lucide-react'

type PolicySectionProps = {
  icon: LucideIcon
  title: string
  description: string
}

export function PolicySection({
  icon: Icon,
  title,
  description,
}: PolicySectionProps) {
  return (
    <div className="flex items-start space-x-6 group">
      <div className="bg-opacity-10 rounded-full p-3 group-hover:bg-opacity-20 transition-colors duration-200">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-primary font-heading group-hover:text-primary-focus transition-colors duration-200">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
