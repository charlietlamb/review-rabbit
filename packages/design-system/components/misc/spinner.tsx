import { LoaderCircle } from 'lucide-react'
import { cn } from '@burse/design-system/lib/utils'

export default function Spinner({ className }: { className?: string }) {
  return <LoaderCircle className={cn('h-4 w-4 animate-spin', className)} />
}
