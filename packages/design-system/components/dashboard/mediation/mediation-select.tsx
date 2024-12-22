import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@remio/design-system/lib/utils'
import { Button } from '@remio/design-system/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@remio/design-system/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@remio/design-system/components/ui/popover'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { useInfiniteQueryWithAtom } from '@remio/design-system/hooks/use-infinite-query-with-atom'
import Spinner from '@remio/design-system/components/misc/spinner'
import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import { useFormContext } from '@remio/design-system/components/form/form-context'
import FieldInfo from '@remio/design-system/components/form/field-info'
import { z } from 'zod'
import RequiredLabel from '@remio/design-system/components/misc/required-label'
import {
  mediationsSelectAtom,
  mediationsSelectSearchAtom,
} from '@remio/design-system/atoms/dashboard/mediations/mediation-select-atoms'
import MediationAvatar from './mediation-avatar'
import { MediationWithData } from '@remio/database'
import { fetchMediationsByPage } from '@remio/design-system/actions/mediations/fetch-mediations-by-page'

interface MediationSelectProps {
  form: TanstackForm<any>
  selectedMediation: MediationWithData | null
  setSelectedMediation: (mediation: MediationWithData | null) => void
  className?: string
}

type MediationDataType = MediationWithData['data'][number]

export default function MediationSelect({
  form,
  selectedMediation,
  setSelectedMediation,
  className,
}: MediationSelectProps) {
  const { attemptSubmitted } = useFormContext()
  const { items: mediations, isLoading } = useInfiniteQueryWithAtom({
    queryKey: 'mediations-select',
    fetchFn: fetchMediationsByPage,
    atom: mediationsSelectAtom,
    searchAtom: mediationsSelectSearchAtom,
    filterFn: (mediation, search) =>
      mediation.title.toLowerCase().includes(search.toLowerCase()) ||
      mediation.data.some((data) =>
        data.client.name.toLowerCase().includes(search.toLowerCase())
      ),
  })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useAtom(mediationsSelectSearchAtom)

  return (
    <form.Field
      name="mediationId"
      validators={{
        onChange: z.string().min(1, 'Please select a mediation'),
      }}
    >
      {(field) => (
        <div className={cn('flex flex-col gap-1', className)}>
          <RequiredLabel
            htmlFor="mediation-select"
            className="font-heading text-base font-semibold text-foreground"
          >
            Mediation
          </RequiredLabel>
          <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  'w-full justify-between bg-background hover:bg-background h-auto px-2',
                  attemptSubmitted &&
                    field.state.meta.errors.some((error) => error) &&
                    'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                )}
              >
                {selectedMediation ? (
                  <span className="flex items-center gap-2">
                    <MediationAvatar mediation={selectedMediation} />
                    <span className="flex flex-col items-start gap-0.5">
                      <span className="block font-medium">
                        {selectedMediation.title}
                      </span>
                      {selectedMediation.data.some(
                        (data: MediationDataType) => data.client.name
                      ) && (
                        <span className="block text-xs text-muted-foreground truncate">
                          {selectedMediation.data
                            .map((data: MediationDataType) => data.client.name)
                            .join(', ')}
                        </span>
                      )}
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Select a mediation...
                  </span>
                )}
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search mediations..."
                  value={search}
                  onValueChange={(value) => setSearch(value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setOpen(false)
                    }
                    e.stopPropagation()
                  }}
                />
                <CommandList>
                  <CommandEmpty>
                    {isLoading ? (
                      <div className="flex py-4 items-center justify-center h-full">
                        <Spinner />
                      </div>
                    ) : (
                      'No mediations found.'
                    )}
                  </CommandEmpty>
                  <CommandGroup>
                    {mediations.map((mediation) => (
                      <CommandItem
                        key={mediation.id}
                        value={mediation.id}
                        onSelect={() => {
                          setSelectedMediation(mediation)
                          field.handleChange(mediation.id)
                          setOpen(false)
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        className="cursor-pointer hover:bg-border transition-colors duration-300"
                      >
                        <span className="flex items-center gap-2">
                          <MediationAvatar mediation={mediation} />
                          <span className="flex flex-col items-start gap-0.5">
                            <span className="block font-medium">
                              {mediation.title}
                            </span>
                            {mediation.data.some(
                              (data: MediationDataType) => data.client.name
                            ) && (
                              <span className="block text-xs text-muted-foreground truncate">
                                {mediation.data
                                  .map(
                                    (data: MediationDataType) =>
                                      data.client.name
                                  )
                                  .join(', ')}
                              </span>
                            )}
                          </span>
                        </span>
                        {selectedMediation?.id === mediation.id && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}
