import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@rabbit/design-system/lib/utils'
import { Button } from '@rabbit/design-system/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@rabbit/design-system/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@rabbit/design-system/components/ui/popover'
import { useState } from 'react'
import { useAtom } from 'jotai'
import {
  workflowsSelectAtom,
  workflowsSelectSearchAtom,
} from '@rabbit/design-system/atoms/dashboard/workflows/workflow-select-atoms'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import { getWorkflows } from '@rabbit/design-system/actions/workflows/get-workflows'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { useFormContext } from '@rabbit/design-system/components/form/form-context'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'

export default function WorkflowSelect({
  selectedWorkflow,
  setSelectedWorkflow,
  required = true,
  className,
}: {
  selectedWorkflow: string | null
  setSelectedWorkflow: (workflow: string | null) => void
  required?: boolean
  className?: string
}) {
  const { attemptSubmitted } = useFormContext()
  const { items: workflows, isLoading } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.WORKFLOW_SELECT,
    fetchFn: getWorkflows,
    atom: workflowsSelectAtom,
    searchAtom: workflowsSelectSearchAtom,
    filterFn: (workflow, search) =>
      workflow.title.toLowerCase().includes(search.toLowerCase()),
  })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useAtom(workflowsSelectSearchAtom)

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <RequiredLabel
        required={required}
        htmlFor="workflow-select"
        className="font-heading text-base font-semibold text-foreground"
      >
        Workflow
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
                !selectedWorkflow &&
                'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            )}
          >
            {selectedWorkflow ? (
              <span className="block font-medium">
                {
                  workflows.find((workflow) => workflow.id === selectedWorkflow)
                    ?.title
                }
              </span>
            ) : (
              <span className="text-muted-foreground">
                Select a workflow...
              </span>
            )}
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search workflows..."
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
                  'No workflows found.'
                )}
              </CommandEmpty>
              <CommandGroup>
                {workflows.map((workflow) => (
                  <CommandItem
                    key={workflow.id}
                    value={workflow.id}
                    onSelect={() => {
                      setSelectedWorkflow(workflow.id)
                      setOpen(false)
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="cursor-pointer hover:bg-border transition-colors duration-300"
                  >
                    <span className="block font-medium">{workflow.title}</span>
                    {selectedWorkflow === workflow.id && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {attemptSubmitted && !selectedWorkflow && (
        <p className="text-sm text-destructive">You must select a workflow</p>
      )}
    </div>
  )
}
