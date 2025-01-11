import { Account } from '@rabbit/database/schema/auth/accounts'
import DashboardWrap from '../dashboard/dashboard-wrap'
import ReviewsTable from './table/reviews-table'

export default function Reviews({ account }: { account: Account }) {
  return (
    <DashboardWrap title="Reviews" subtitle="Manage and respond to reviews">
      <div className="flex-grow">
        <ReviewsTable account={account} />
      </div>
    </DashboardWrap>
  )
}
