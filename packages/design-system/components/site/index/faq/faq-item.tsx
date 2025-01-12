'use client'

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@rabbit/design-system/components/ui/accordion'
import { motion } from 'framer-motion'

interface FaqItemProps {
  id: string
  question: string
  answer: string
}

export function FaqItem({ id, question, answer }: FaqItemProps) {
  return (
    <AccordionItem
      value={id}
      className="border bg-background rounded-lg px-6 data-[state=open]:bg-accent/50"
    >
      <AccordionTrigger className="gap-4 py-6 text-left hover:no-underline [&[data-state=open]>svg]:rotate-45">
        <motion.span
          initial={false}
          className="text-lg font-semibold leading-relaxed"
        >
          {question}
        </motion.span>
      </AccordionTrigger>
      <AccordionContent className="overflow-hidden pb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="text-base"
        >
          {answer}
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  )
}
