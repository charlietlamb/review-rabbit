import { Rabbit, Slash } from 'lucide-react'
import DashboardHeaderBusiness from './dashboard-header-business'
import DashboardHeaderLocation from './dashboard-header-location'
import Link from 'next/link'

export default function DashboardHeader() {
  return (
    <header className="h-16 flex items-center p-2 gap-2 px-4 group/header">
      <Link href="/dashboard">
        <Rabbit className="min-w-8 min-h-8 fill-muted-foreground text-muted-foreground hover:text-foreground hover:fill-foreground transition-all duration-300" />
      </Link>
      <Slash className="rotate-[-30deg] text-muted-foreground/50" />
      <DashboardHeaderBusiness />
      <Slash className="rotate-[-30deg] text-muted-foreground/50" />
      <DashboardHeaderLocation />
    </header>
  )
}
