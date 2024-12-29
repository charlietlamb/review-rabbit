import Link from 'next/link'

type NavLink = {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
]

type NavLinksProps = {
  className?: string
  linkClassName?: string
}

export function NavLinks({ className, linkClassName }: NavLinksProps) {
  return (
    <nav className={className}>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClassName}>
          {label}
        </Link>
      ))}
    </nav>
  )
}
