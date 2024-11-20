import { MobileNavbar } from '@/components/site/index/mobile-navbar'
import { NavLinks } from './nav-links'
import { ActionButton } from '../action-button'

export function MobileNav() {
  return (
    <MobileNavbar>
      <div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl">
        <NavLinks
          className="flex flex-col gap-1 pt-2"
          linkClassName="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
        />
        <ActionButton size="lg" className="mt-2 w-full" />
      </div>
    </MobileNavbar>
  )
}
