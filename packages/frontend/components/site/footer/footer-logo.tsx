import { Code } from 'lucide-react'
import Link from 'next/link'

export function FooterLogo() {
  return (
    <Link href="#" className="flex items-center gap-3">
      <Code />
      <span className="font-heading text-xl font-bold">remio</span>
    </Link>
  )
}
