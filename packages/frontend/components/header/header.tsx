import { Logo } from './logo'
import { DesktopNav } from './nav/desktop-nav'
import { MobileNav } from './nav/mobile-nav'

export function Header() {
  return (
    <header className="container flex items-center justify-between gap-10 py-4">
      <Logo />
      <DesktopNav />
      <MobileNav />
    </header>
  )
}
