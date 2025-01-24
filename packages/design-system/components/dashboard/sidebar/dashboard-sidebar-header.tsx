import { LogoSvg } from '@rabbit/design-system/components/site/header/logo-svg'
import Link from 'next/link'
import { useSidebar } from '@rabbit/design-system/components/ui/sidebar'

export default function DashboardSidebarHeader() {
  const { open } = useSidebar()
  return (
    <Link
      href="/dashboard"
      className="justify-center w-full h-16 flex items-center gap-2 p-4 group"
    >
      <LogoSvg className="min-w-8 min-h-8 fill-muted-foreground text-muted-foreground group-hover:text-foreground group-hover:fill-foreground transition-all duration-300" />
      {open && (
        <span className="font-heading text-md inline-flex text-muted-foreground w-full font-bold group-hover:text-foreground transition-all duration-300">
          Review Rabbit
        </span>
      )}
    </Link>
  )
}
