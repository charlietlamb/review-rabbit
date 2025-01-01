import Link from 'next/link'
import { cn } from '@rabbit/design-system/lib/utils'
import { LogoSvg } from './logo-svg'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-foreground fill-foreground',
        className
      )}
    >
      <LogoSvg className="w-8 h-8 fill-foreground" />
      <span className="font-heading text-xl font-bold mb-0.5">
        Review Rabbit
      </span>
    </Link>
  )
}
