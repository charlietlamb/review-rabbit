// Dependencies: pnpm install @remixicon/react

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Columns, Grid } from 'lucide-react'

export default function Radio12() {
  return (
    <RadioGroup className="flex gap-2 hidden lg:flex" defaultValue="cc">
      <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input p-3 text-center shadow-sm shadow-black/5 ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2 aspect-square">
        <RadioGroupItem
          id="radio-12-cc"
          value="cc"
          className="sr-only after:absolute after:inset-0"
        />
        <Grid className="opacity-60" size={20} aria-hidden="true" />
      </label>
      <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input p-3 text-center shadow-sm shadow-black/5 ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2 aspect-square">
        <RadioGroupItem
          id="radio-12-paypal"
          value="paypal"
          className="sr-only after:absolute after:inset-0"
        />
        <Columns className="opacity-60" size={20} aria-hidden="true" />
      </label>
    </RadioGroup>
  )
}
