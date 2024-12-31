'use client'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparatorSlash,
} from '@rabbit/design-system/components/ui/breadcrumb'
import { useIsMobile } from '@rabbit/design-system/hooks/use-mobile'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerChevrons,
  SelectValue,
} from '@rabbit/design-system/components/ui/select'
import { LogoSvg } from '@rabbit/design-system/components/site/header/logo-svg'
import DashboardBreadcrumbStripe from './dashboard-breadcrumb-stripe'

export default function DashboardBreadcrumb() {
  const mobile = useIsMobile()
  const showIsTest = true
  return (
    <Breadcrumb aria-label="breadcrumb" className="ml-4">
      <BreadcrumbList className="gap-0 sm:gap-0">
        <BreadcrumbItem>
          <LogoSvg className="size-7 text-muted-foreground fill-muted-foreground mr-4" />
        </BreadcrumbItem>
        <BreadcrumbSeparatorSlash />
        {/* <BreadcrumbItem>
          <DashboardBreadcrumbStripe />
        </BreadcrumbItem> */}
        <BreadcrumbSeparatorSlash />
        <BreadcrumbItem>
          <Select defaultValue="s1">
            <SelectTriggerChevrons
              id="select-database"
              className="relative"
              aria-label="Select database"
            >
              <SelectValue placeholder="Select time" />
            </SelectTriggerChevrons>
            <SelectContent>
              <SelectItem value="s1">Orion</SelectItem>
              <SelectItem value="s2">Sigma</SelectItem>
              <SelectItem value="s3">Dorado</SelectItem>
            </SelectContent>
          </Select>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
