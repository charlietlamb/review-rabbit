import DashboardContentHeader from '../header/dashboard-content-header'
import { cn } from '@rabbit/design-system/lib/utils'

export default function DashboardWrap({
  title,
  subtitle,
  right,
  left,
  className,
  children,
}: {
  title: string
  subtitle: string
  right?: React.ReactNode
  left?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col divide-y h-full flex-grow relative overflow-hidden bg-muted/50 md:rounded-tl-lg md:border-l border-t',
        className
      )}
    >
      <DashboardContentHeader
        title={title}
        subtitle={subtitle}
        right={right}
        left={left}
      />
      {children}
    </div>
  )
}
