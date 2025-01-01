'use client'

import Link from 'next/link'

type NavLink = {
  href: string
  label: string
}

const links: NavLink[] = [{ href: '/pricing', label: 'Pricing' }]

export function NavLinks({
  className,
  linkClassName,
  loggedIn,
}: {
  className?: string
  linkClassName?: string
  loggedIn: boolean
}) {
  return (
    <nav className={className}>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClassName}>
          {label}
        </Link>
      ))}
      <Link
        href={loggedIn ? '/dashboard' : '/signup'}
        className={linkClassName}
      >
        {loggedIn ? 'Dashboard' : 'Sign up'}
      </Link>
    </nav>
  )
}
