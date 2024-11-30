'use client'

import Toolbar from '@dubble/design-system/components/misc/toolbar/toolbar'
import DashboardConnectProviders from './providers/dashboard-connect-providers'
import {
  providersLayoutAtom,
  providersSearchAtom,
  providersSortAtom,
} from '@dubble/design-system/atoms/providers/provders-atom'
import { useAtom } from 'jotai'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@dubble/design-system/components/ui/button'
import DashboardConnectFooter from './footer/dashboard-connect-footer'
import DashboardConnectButton from './dashboard-connect-button'

export default function DashboardConnect() {
  const [search, setSearch] = useAtom(providersSearchAtom)
  const [sort, setSort] = useAtom(providersSortAtom)
  const [layout, setLayout] = useAtom(providersLayoutAtom)
  const sortOptions = [
    { label: 'Name ascending', value: 'name-ascending' },
    { label: 'Name descending', value: 'name-descending' },
  ]
  return (
    <div className="flex flex-col divide-y gap-4 flex-grow">
      <Toolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort as Dispatch<SetStateAction<string>>}
        sortOptions={sortOptions}
        layout={layout}
        setLayout={setLayout as Dispatch<SetStateAction<string>>}
        button={<DashboardConnectButton className="w-auto" />}
      />
      <DashboardConnectProviders />
      <DashboardConnectFooter />
    </div>
  )
}
