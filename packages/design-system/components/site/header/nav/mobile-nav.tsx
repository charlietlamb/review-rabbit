import { MobileNavbar } from '@rabbit/design-system/components/site/index/mobile-navbar'
import { NavLinks } from './nav-links'

export function MobileNav({ loggedIn }: { loggedIn: boolean }) {
  return (
    <MobileNavbar>
      <div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl gap-4">
        <NavLinks
          className="flex flex-col pt-2"
          linkClassName="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground font-heading"
          loggedIn={loggedIn}
        />
      </div>
    </MobileNavbar>
  )
}
