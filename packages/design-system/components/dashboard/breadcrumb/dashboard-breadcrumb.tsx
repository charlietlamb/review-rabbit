'use client'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparatorSlash,
} from '@rabbit/design-system/components/ui/breadcrumb'
import { useIsMobile } from '@rabbit/design-system/hooks/use-mobile'
import { LogoSvg } from '@rabbit/design-system/components/site/header/logo-svg'
import Link from 'next/link'
import DashboardBreadcrumbBusiness from './dashboard-breadcrumb-business'

export default function DashboardBreadcrumb() {
  const mobile = useIsMobile()
  const showIsTest = true
  return (
    <Breadcrumb aria-label="breadcrumb" className="ml-4">
      <BreadcrumbList className="gap-0 sm:gap-0">
        <BreadcrumbItem>
          <Link href="/dashboard">
            <LogoSvg className="size-7 text-muted-foreground fill-muted-foreground mr-2" />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparatorSlash />
        <BreadcrumbItem>
          <DashboardBreadcrumbBusiness />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
