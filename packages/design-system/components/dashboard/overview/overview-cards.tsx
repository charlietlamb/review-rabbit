import { CircleDollarSign } from 'lucide-react'
import OverviewCard from './overview-card'

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
      <OverviewCard
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1%"
        icon={<CircleDollarSign />}
      />
      <OverviewCard
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1%"
        icon={<CircleDollarSign />}
      />
      <OverviewCard
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1%"
        icon={<CircleDollarSign />}
      />
      <OverviewCard
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1%"
        icon={<CircleDollarSign />}
      />
    </div>
  )
}
