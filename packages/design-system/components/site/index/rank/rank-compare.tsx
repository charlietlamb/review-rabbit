import { cn } from '@rabbit/design-system/lib/utils'

export default function RankCompare({
  title,
  points,
  className,
  icon,
}: {
  title: string
  points: string[]
  className?: string
  icon: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-lg h-full font-heading font-bold flex flex-col p-8 gap-4',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-4xl text-foreground">{title}</span>
      </div>
      <ul className="flex flex-col gap-1 list-disc pl-5">
        {points.map((point, index) => (
          <li key={index} className="text-lg">
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
