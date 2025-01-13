import { HeaderTheme } from '../header-theme'
import { NavLinks } from './nav-links'

export function DesktopNav({ loggedIn }: { loggedIn: boolean }) {
  return (
    <div className="hidden items-center md:flex flex-grow h-full max-h-full h-14 md:h-12 justify-end divide-x">
      <NavLinks
        loggedIn={loggedIn}
        className="flex items-center justify-end divide-x h-full border-l"
        linkClassName="flex cursor-pointer items-center font-semibold font-heading text-foreground duration-300 transition-colors hover:bg-primary/20 md:hover:bg-transparent sm:text-base px-4 h-full md:hover:text-primary"
      />
      <HeaderTheme />
    </div>
  )
}
