import { Accordion } from '@/components/ui/accordion'
import { FaqItem } from './faq-item'
import { faqData } from './faq-data'

export function Faq() {
  return (
    <section className="sm:gap-7 container flex flex-col items-center gap-6 py-24">
      <div className="flex flex-col gap-3">
        <span className="text-primary font-bold text-center uppercase">
          Faq
        </span>
        <h2 className="font-heading sm:text-4xl text-balance text-3xl font-semibold tracking-tight text-center">
          Frequently Asked Questions
        </h2>
      </div>
      <p className="text-muted-foreground text-balance max-w-lg text-lg text-center">
        For any other questions, please feel free to contact us.
      </p>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-3xl mt-6 divide-y"
      >
        {faqData.map((item) => (
          <FaqItem key={item.value} {...item} />
        ))}
      </Accordion>
    </section>
  )
}
