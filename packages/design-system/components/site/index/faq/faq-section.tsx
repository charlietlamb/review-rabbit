'use client'

import { Accordion } from '@rabbit/design-system/components/ui/accordion'
import { FaqItem } from './faq-item'
import { faqData } from './faq-data'
import Balancer from 'react-wrap-balancer'

export function Faq() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="container relative flex flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center">
          <span className="text-primary font-bold text-center uppercase">
            Common Questions
          </span>
          <Balancer>
            <h2 className="font-heading max-w-2xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </Balancer>
        </div>

        <p className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          Everything you need to know about our review management platform.
          Can't find what you're looking for? Reach out to our support team.
        </p>

        <div className="w-full max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full mt-8 space-y-4"
            defaultValue="1"
          >
            {faqData.map((item) => (
              <FaqItem key={item.id} {...item} />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
