import Link from 'next/link'
import { cn } from '@remio/design-system/lib/utils'
import { Flower } from 'lucide-react'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 text-foreground', className)}
    >
      <Flower />
      <span className="font-heading text-xl font-bold mb-0.5">remio</span>
    </Link>
  )
}
