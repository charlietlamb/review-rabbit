import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

type FaqItemProps = {
  value: string
  question: string
  answer: string
}

export function FaqItem({ value, question, answer }: FaqItemProps) {
  return (
    <AccordionItem value={value} className="border-b-0">
      <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-lg text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  )
}
