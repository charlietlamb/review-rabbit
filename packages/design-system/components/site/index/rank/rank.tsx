import { NumberTicker } from '@rabbit/design-system/components/magic/number-ticker'
import RankCompare from './rank-compare'
import { Rabbit, BookX } from 'lucide-react'
import { cn } from '@rabbit/design-system/lib/utils'

export default function Rank() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 py-32 relative">
        {/* Header Section */}
        <div className="space-y-6 text-center max-w-4xl mx-auto mb-16">
          <span className="text-primary font-bold text-center uppercase">
            Rank On Google
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            <div className="relative">
              <span className="inline-block bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent [text-wrap:balance]">
                Easily Rank
              </span>
            </div>

            <div className="flex items-center gap-2 text-primary whitespace-nowrap">
              <span>No.</span>
              <NumberTicker
                spinTiming={{
                  duration: 1500,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>

            <div className="relative">
              <span className="inline-block bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent [text-wrap:balance]">
                In Your Area
              </span>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mx-auto">
          <div className="group">
            <RankCompare
              title="Common Mistakes"
              icon={
                <BookX className="size-12 text-red-500 transition-transform group-hover:scale-110 duration-300" />
              }
              points={[
                '£££ Spent on Advertising',
                '£££ Spent on Websites',
                '£££ Spent on SEO',
                '£££ Spent on Social Media',
                '£££ Spent on Fake Reviews',
              ]}
              className={cn(
                'border-2 rounded-3xl shadow-lg transition-all duration-300',
                'bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent',
                'border-red-500/20 hover:border-red-500',
                'hover:shadow-red-500/10 hover:shadow-xl',
                'text-red-500'
              )}
            />
          </div>

          <div className="group">
            <RankCompare
              title="With Review Rabbit"
              icon={
                <Rabbit className="size-12 fill-emerald-500 text-emerald-500 transition-transform group-hover:scale-110 duration-300" />
              }
              points={[
                'Organic Review Generation From Your Clients',
                'Automatically Trigger Review Messages',
                'Email, SMS, and WhatsApp Automations',
                'Organically Outrank Your Competitors',
                'No Unnecessary Stress Or £££ Spent',
              ]}
              className={cn(
                'border-2 rounded-3xl shadow-lg transition-all duration-300',
                'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent',
                'border-emerald-500/20 hover:border-emerald-500',
                'hover:shadow-emerald-500/10 hover:shadow-xl',
                'text-emerald-500'
              )}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
