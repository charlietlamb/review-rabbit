import Link from 'next/link'
import { cn } from '@remio/design-system/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-3 text-foreground', className)}
    >
      <span className="font-heading text-xl font-bold">remio</span>
    </Link>
  )
}
