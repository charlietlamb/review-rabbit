import Link from 'next/link'
import { cn } from '@burse/design-system/lib/utils'
import { LogoSvg } from './logo-svg'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-foreground fill-foreground h-full px-4',
        className
      )}
    >
      <LogoSvg className="w-8 h-8" />
      <span className="font-heading text-xl font-bold mb-0.5">burse</span>
    </Link>
  )
}
