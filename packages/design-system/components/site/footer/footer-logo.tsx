import { Code } from 'lucide-react'
import Link from 'next/link'

export function FooterLogo() {
  return (
    <Link href="#" className="flex items-center gap-3">
      <span className="font-heading text-xl font-bold text-foreground">
        remio
      </span>
    </Link>
  )
}
