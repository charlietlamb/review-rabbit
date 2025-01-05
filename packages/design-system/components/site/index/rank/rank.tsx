import { NumberTicker } from '@rabbit/design-system/components/magic/number-ticker'
import RankCompare from './rank-compare'
import { Rabbit, BookX } from 'lucide-react'

export default function Rank() {
  return (
    <div className="flex flex-col items-center justify-center padding-main 2 w-full gap-2 lg:pt-0 pt-16">
      <span className="text-primary font-bold text-center uppercase">
        Rank on Google
      </span>
      <div className="inline items-center text-center justify-center font-heading font-bold gap-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl pb-6">
        Easily Rank
        <span className="text-primary px-2">
          No.
          <NumberTicker value={100} direction="down" />
        </span>
        In Your Area
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <RankCompare
          title="Common Mistakes"
          icon={<BookX className="size-10 text-foreground" />}
          points={[
            '£££ Spent on Advertising',
            '£££ Spent on Websites',
            '£££ Spent on SEO',
            '£££ Spent on Social Media',
            '£££ Spent on Fake Reviews',
          ]}
          className="bg-red-500/20 text-red-500 border-red-500 border-2"
        />
        <RankCompare
          title="With Review Rabbit"
          icon={<Rabbit className="size-10 fill-foreground text-foreground" />}
          points={[
            'Organic Review Generation From Your Clients',
            'Automatically Trigger Review Messages',
            'Email, SMS, and WhatsApp Automations',
            'Organically Outrank Your Competitors',
            'No Unnecessary Stress Or £££ Spent',
          ]}
          className="bg-emerald-500/20 text-emerald-500 border-emerald-500 border-2"
        />
      </div>
    </div>
  )
}
