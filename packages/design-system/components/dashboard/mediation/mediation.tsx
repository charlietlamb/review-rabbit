'use client'

import { MediationWithData } from '@remio/database/schema/mediations'
import MediationForm from './mediation-form'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { breadcrumbOverrideAtom } from '@remio/design-system/atoms/dashboard/breadcrumb/breadcrumb-atom'
import DashboardContentHeader from '../header/dashboard-content-header'

export default function Mediation({
  mediation,
}: {
  mediation: MediationWithData
}) {
  const breadcrumbOverride = useSetAtom(breadcrumbOverrideAtom)

  useEffect(() => {
    breadcrumbOverride(mediation.title)
  }, [mediation.title])

  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title={mediation.title}
        subtitle={`Manage ${mediation.title}`}
      />
      <MediationForm mediation={mediation} />
    </div>
  )
}
