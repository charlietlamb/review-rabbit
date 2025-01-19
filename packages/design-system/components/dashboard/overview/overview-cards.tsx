import { BarChart3, MessagesSquare, Star, Users } from 'lucide-react'
import OverviewCard from './overview-card'

const mockCardData = [
  {
    title: 'Total Reviews',
    value: '2,853',
    icon: <Star className="h-4 w-4" />,
    change: '12%',
    changeValue: 12,
  },
  {
    title: 'Average Rating',
    value: '4.8',
    icon: <BarChart3 className="h-4 w-4" />,
    change: '3%',
    changeValue: 3,
  },
  {
    title: 'Active Users',
    value: '1,234',
    icon: <Users className="h-4 w-4" />,
    change: '-2%',
    changeValue: -2,
  },
  {
    title: 'Response Rate',
    value: '95%',
    icon: <MessagesSquare className="h-4 w-4" />,
    change: '5%',
    changeValue: 5,
  },
]

export default function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
      {mockCardData.map((card) => (
        <OverviewCard key={card.title} {...card} />
      ))}
    </div>
  )
}
