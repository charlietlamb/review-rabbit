import {
  RadioGroup,
  RadioGroupItem,
} from '@dubble/design-system/components/ui/radio-group'
import { Grid, Rows3 } from 'lucide-react'
import { useToolbarContext } from './toolbar-context'

export default function ToolbarLayout() {
  const { layout, setLayout } = useToolbarContext()
  return (
    <RadioGroup
      className="gap-2 hidden lg:flex"
      value={layout}
      onValueChange={(value) => setLayout(value as 'grid' | 'list')}
    >
      <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input p-3 text-center shadow-sm shadow-black/5 ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2 aspect-square">
        <RadioGroupItem
          id="grid"
          value="grid"
          className="sr-only after:absolute after:inset-0"
        />
        <Grid className="opacity-60" size={20} aria-hidden="true" />
      </label>
      <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input p-3 text-center shadow-sm shadow-black/5 ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2 aspect-square">
        <RadioGroupItem
          id="list"
          value="list"
          className="sr-only after:absolute after:inset-0"
        />
        <Rows3 className="opacity-60" size={20} aria-hidden="true" />
      </label>
    </RadioGroup>
  )
}
