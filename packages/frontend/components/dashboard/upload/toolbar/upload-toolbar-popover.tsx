import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { EllipsisVertical } from 'lucide-react'

export function UploadToolbarPopover() {
  const items = [
    { id: '', value: 'r1', label: 'Hobby', price: '$9/mo' },
    { id: 'radio-15-r2', value: 'r2', label: 'Plus', price: '$29/mo' },
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
      <PopoverContent className="w-80">
        <RadioGroup
          className="gap-0 -space-y-px rounded-t-lg shadow-sm shadow-black/5"
          defaultValue="r2"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col gap-4 border border-input p-4 first:rounded-t-lg has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id={item.id}
                    value={item.value}
                    className="after:absolute after:inset-0"
                    aria-describedby={`${item.id}-price`}
                  />
                  <Label className="inline-flex items-start" htmlFor={item.id}>
                    {item.label}
                  </Label>
                </div>
                <div
                  id={`${item.id}-price`}
                  className="text-xs leading-[inherit] text-muted-foreground"
                >
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        <RadioGroup
          className="gap-0 -space-y-px rounded-b-lg shadow-sm shadow-black/5"
          defaultValue="r2"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col gap-4 border border-input p-4 last:rounded-b-lg has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id={item.id}
                    value={item.value}
                    className="after:absolute after:inset-0"
                    aria-describedby={`${item.id}-price`}
                  />
                  <Label className="inline-flex items-start" htmlFor={item.id}>
                    {item.label}
                  </Label>
                </div>
                <div
                  id={`${item.id}-price`}
                  className="text-xs leading-[inherit] text-muted-foreground"
                >
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}
