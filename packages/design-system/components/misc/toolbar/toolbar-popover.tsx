import {
  RadioGroup,
  RadioGroupItem,
} from '@rabbit/design-system/components/ui/radio-group'
import { Label } from '@rabbit/design-system/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@rabbit/design-system/components/ui/popover'
import { EllipsisVertical } from 'lucide-react'
import { useToolbarContext } from './toolbar-context'

export function ToolbarPopover() {
  const { sort, setSort, sortOptions, layout, setLayout } = useToolbarContext()
  const layoutItems = [
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="lg:hidden absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Press to speak"
          type="submit"
        >
          <EllipsisVertical size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-col gap-1">
        <Label className="font-heading text-base">Sort</Label>
        <RadioGroup
          className="gap-0 -space-y-px shadow-sm shadow-black/5"
          defaultValue={sort}
          onValueChange={(value) => setSort(value as string)}
        >
          {sortOptions.map((item) => (
            <div
              key={item.value}
              className="relative flex flex-col gap-4 border border-input p-4 first:rounded-t-lg last:rounded-b-lg has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id={item.value}
                    value={item.value}
                    className="after:absolute after:inset-0"
                    aria-describedby={`${item.value}`}
                  />
                  <Label
                    className="inline-flex items-start"
                    htmlFor={item.value}
                  >
                    {item.label}
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        <Label className="font-heading text-base hidden md:flex">Layout</Label>
        <RadioGroup
          className="gap-0 -space-y-px rounded-b-lg shadow-sm shadow-black/5 hidden md:flex flex-col"
          defaultValue={layout}
          onValueChange={(value) => setLayout(value as 'grid' | 'list')}
        >
          {layoutItems.map((item) => (
            <div
              key={item.value}
              className="relative flex flex-col gap-4 border border-input p-4 first:rounded-t-lg last:rounded-b-lg has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id={item.value}
                    value={item.value}
                    className="after:absolute after:inset-0"
                    aria-describedby={`${item.value}`}
                  />
                  <Label
                    className="inline-flex items-start"
                    htmlFor={item.value}
                  >
                    {item.label}
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}
