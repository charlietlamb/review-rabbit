import { LogoSvg } from '@rabbit/design-system/components/site/header/logo-svg'
import Link from 'next/link'

export default function DashboardSidebarHeader() {
  return (
    <div className="justify-center w-full h-16 flex items-center gap-2 p-4">
      <Link href="/dashboard">
        <LogoSvg className="min-w-8 min-h-8 fill-muted-foreground text-muted-foreground hover:text-foreground hover:fill-foreground transition-all duration-300" />
      </Link>
      <span className="font-heading text-md inline-block text-muted-foreground w-full font-bold">
        Review Rabbit
      </span>
    </div>
  )
}
