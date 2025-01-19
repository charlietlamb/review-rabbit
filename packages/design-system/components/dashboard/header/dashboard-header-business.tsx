'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
  SelectGroup,
  SelectLabel,
} from '@rabbit/design-system/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { getBusinesses } from '@rabbit/design-system/actions/business/get-businesses'
import BusinessAvatar from '../business/business-avatar'
import { cn } from '@rabbit/design-system/lib/utils'
import { useAtom } from 'jotai'
import { selectedBusinessAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atoms'
import { Plus, ChevronDown, Home } from 'lucide-react'
import BusinessFormDialog from '../business/business-form-dialog'
import { BusinessWithLocations } from '@rabbit/database/types/business-location-types'

export default function DashboardHeaderBusiness() {
  const [selectedBusiness, setSelectedBusiness] = useAtom(selectedBusinessAtom)

  const { data: businesses, isLoading } = useQuery<BusinessWithLocations[]>({
    queryKey: QUERY_KEYS.BUSINESS,
    queryFn: async () => {
      const result = await getBusinesses(0)
      return result
    },
  })
  return (
    <Select
      value={selectedBusiness?.id}
      onValueChange={(value) => {
        const business = businesses?.find((b) => b.id === value)
        if (business) setSelectedBusiness(business)
      }}
    >
      <SelectTrigger
        className={cn(
          'w-fit h-full border-0 rounded-none bg-transparent px-1 gap-1 group/select'
        )}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="shrink-0">
            {selectedBusiness ? (
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                <Home className="h-4 w-4 text-primary" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                <Plus className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
          <p className="text-sm font-medium font-heading text-muted-foreground group-hover/select:text-primary">
            <SelectValue placeholder="Select a business" />
          </p>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="px-2 py-1.5 text-xs font-medium">
            Your Businesses
          </SelectLabel>
          {businesses?.map((business) => (
            <SelectItem key={business.id} value={business.id}>
              <div className="flex items-center gap-2 py-0.5">
                <BusinessAvatar
                  business={business}
                  className="h-6 w-6 shrink-0"
                />
                <span className="truncate">{business.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator className="my-2" />
        <BusinessFormDialog>
          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <span className="text-primary">Add Business</span>
            </div>
          </button>
        </BusinessFormDialog>
      </SelectContent>
    </Select>
  )
}
