import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="font-heading text-xl font-bold text-foreground">
        remio
      </span>
    </Link>
  )
}
