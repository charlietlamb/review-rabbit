import { ActionButton } from '../action-button'
import { NavLinks } from './nav-links'

export function DesktopNav() {
  return (
    <div className="hidden items-center gap-10 md:flex">
      <NavLinks
        className="flex items-center gap-10 justify-end"
        linkClassName="flex cursor-pointer items-center font-semibold font-heading text-foreground transition-colors hover:text-theme-950 sm:text-base"
      />
      <div className="flex items-center gap-2">
        <ActionButton className="font-medium" />
      </div>
    </div>
  )
}
