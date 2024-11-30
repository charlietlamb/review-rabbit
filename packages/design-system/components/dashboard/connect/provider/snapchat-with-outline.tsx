import { cn } from '@dubble/design-system/lib/utils'
import { RiSnapchatFill, RiSnapchatLine } from 'react-icons/ri'

export default function SnapchatWithOutline({
  className,
  iconClassName,
}: {
  className?: string
  iconClassName?: string
}) {
  return (
    <div className={cn('relative', className)}>
      <RiSnapchatFill
        className={cn('text-white', iconClassName)}
        strokeWidth={0.5}
      />
      <RiSnapchatLine
        className={cn('text-black absolute inset-0', iconClassName)}
        strokeWidth={0.1}
        strokeLinecap="round"
      />
    </div>
  )
}
