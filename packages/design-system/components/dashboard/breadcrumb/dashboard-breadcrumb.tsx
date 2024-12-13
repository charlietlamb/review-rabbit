'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@remio/design-system/components/ui/breadcrumb'
import React from 'react'
import { useIsMobile } from '@remio/design-system/hooks/use-mobile'
import { cn } from '@remio/design-system/lib/utils'
import { useAtomValue } from 'jotai'
import { breadcrumbOverrideAtom } from '@remio/design-system/atoms/dashboard/breadcrumb/breadcrumb-atom'
import { isUuid } from '@remio/design-system/lib/utils/is-uuid'

export default function DashboardBreadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)
  const mobile = useIsMobile()
  const override = useAtomValue(breadcrumbOverrideAtom)
  return (
    <Breadcrumb aria-label="breadcrumb" className={cn(!mobile && 'ml-2')}>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/')
          if (isUuid(segment)) {
            segment = override ?? segment
          }
          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={href}
                  className="font-semibold font-heading"
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
