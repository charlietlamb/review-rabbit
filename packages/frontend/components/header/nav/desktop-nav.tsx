import { ActionButton } from '../action-button'
import { NavLinks } from './nav-links'

export function DesktopNav() {
  return (
    <div className="hidden items-center gap-10 md:flex">
      <NavLinks
        className="flex items-center gap-10 justify-end"
        linkClassName="flex cursor-pointer items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
      />
      <div className="flex items-center gap-2">
        <ActionButton />
      </div>
    </div>
  )
}
