import { MobileNavbar } from '@rabbit/design-system/components/site/index/mobile-navbar'
import { NavLinks } from './nav-links'

export function MobileNav({ loggedIn }: { loggedIn: boolean }) {
  return (
    <MobileNavbar>
      <div className="p-4 space-y-4">
        <NavLinks
          className="flex flex-col-reverse space-y-2 space-y-reverse"
          linkClassName="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors duration-200"
          loggedIn={loggedIn}
        />
      </div>
    </MobileNavbar>
  )
}
