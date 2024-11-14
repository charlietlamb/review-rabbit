import { Code } from 'lucide-react'
import Link from 'next/link'

export function FooterLogo() {
  return (
    <Link href="#" className="flex items-center gap-3">
      <Code className="text-primary" />
      <span className="font-heading text-xl font-bold text-foreground">
        dubble
      </span>
    </Link>
  )
}
