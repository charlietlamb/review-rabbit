import { MobileNavbar } from '@burse/design-system/components/site/index/mobile-navbar'
import { NavLinks } from './nav-links'
import { ActionButton } from '../action-button'

export function MobileNav() {
  return (
    <MobileNavbar>
      <div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl gap-4">
        <NavLinks
          className="flex flex-col pt-2"
          linkClassName="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground font-heading"
        />
        <ActionButton size="lg" className="p-2 w-full mt-2" />
      </div>
    </MobileNavbar>
  )
}
