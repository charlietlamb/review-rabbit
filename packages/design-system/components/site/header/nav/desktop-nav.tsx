import { ActionButton } from '../action-button'
import { HeaderGithub } from '../header-github'
import { HeaderTheme } from '../header-theme'
import { NavLinks } from './nav-links'

export function DesktopNav() {
  return (
    <div className="hidden items-center md:flex flex-grow h-full justify-end divide-x">
      <NavLinks
        className="flex items-center justify-end divide-x h-full"
        linkClassName="flex cursor-pointer items-center font-semibold font-heading text-foreground transition-colors hover:text-foreground sm:text-base px-4 h-full"
      />
      <ActionButton className="font-medium px-4 h-full flex items-center" />
      <HeaderGithub />
      <HeaderTheme />
    </div>
  )
}
