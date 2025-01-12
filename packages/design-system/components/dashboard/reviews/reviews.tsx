'use client'

import DashboardWrap from '../dashboard/dashboard-wrap'
import ReviewsTable from './table/reviews-table'
import { useAtomValue } from 'jotai'
import { accountAtom } from '@rabbit/design-system/atoms/user/user-atom'

export default function Reviews() {
  const account = useAtomValue(accountAtom)
  return (
    <DashboardWrap title="Reviews" subtitle="Manage and respond to reviews">
      <div className="flex-grow">
        {account && <ReviewsTable account={account} />}
      </div>
    </DashboardWrap>
  )
}
