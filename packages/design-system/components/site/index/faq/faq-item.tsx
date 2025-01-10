import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@rabbit/design-system/components/ui/accordion'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@rabbit/design-system/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface FaqCollapsible {
  title: string
  content: string
  icon: LucideIcon
  open?: boolean
}

interface FaqItemProps {
  id: string
  title: string
  icon: LucideIcon
  collapsibles: FaqCollapsible[]
}

export function FaqItem({ id, title, icon: Icon, collapsibles }: FaqItemProps) {
  return (
    <AccordionItem value={id} className="border-b-0">
      <AccordionTrigger className="justify-start gap-3 text-[15px] leading-6 hover:no-underline [&>svg]:-order-1">
        <span className="flex items-center gap-3">
          <Icon
            size={16}
            strokeWidth={2}
            className="shrink-0 opacity-60"
            aria-hidden="true"
          />
          <span>{title}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="p-0">
        {collapsibles.map((collapsible, index) => (
          <CollapsibleDemo
            key={index}
            title={collapsible.title}
            content={collapsible.content}
            icon={collapsible.icon}
            open={collapsible.open}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

function CollapsibleDemo({
  title,
  content,
  icon: Icon,
  open,
}: {
  title: string
  content: string
  icon: LucideIcon
  open?: boolean
}) {
  return (
    <Collapsible
      className="space-y-1 border-t border-border py-3 pe-4 ps-6"
      defaultOpen={open}
    >
      <CollapsibleTrigger className="flex gap-2 text-[15px] font-semibold leading-6 [&[data-state=open]>svg]:rotate-180">
        <ChevronDown
          size={16}
          strokeWidth={2}
          className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
          aria-hidden="true"
        />
        <span className="flex items-center gap-3">
          <Icon
            size={16}
            strokeWidth={2}
            className="shrink-0 opacity-60"
            aria-hidden="true"
          />
          <span>{title}</span>
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden ps-6 text-sm text-muted-foreground transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {content}
      </CollapsibleContent>
    </Collapsible>
  )
}
