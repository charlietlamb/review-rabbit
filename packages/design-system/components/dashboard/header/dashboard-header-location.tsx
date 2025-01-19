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
import { cn } from '@rabbit/design-system/lib/utils'
import { useAtom } from 'jotai'
import { Plus, Home } from 'lucide-react'
import BusinessFormDialog from '../business/business-form-dialog'
import { LocationWithBusiness } from '@rabbit/database/types/business-location-types'
import { selectedLocationAtom } from '@rabbit/design-system/atoms/dashboard/location/location-atoms'

export default function DashboardHeaderLocation() {
  const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom)

  function getLocations(temp: number) {
    return [] as []
  }

  const { data: locations, isLoading } = useQuery<LocationWithBusiness[]>({
    queryKey: QUERY_KEYS.LOCATIONS,
    queryFn: async () => {
      const result = await getLocations(0)
      return result
    },
  })
  return (
    <Select
      value={selectedLocation?.id}
      onValueChange={(value) => {
        const location = locations?.find((l) => l.id === value)
        if (location) setSelectedLocation(location)
      }}
    >
      <SelectTrigger
        className={cn(
          'w-fit h-full border-0 rounded-none bg-transparent px-1 gap-1 group/select'
        )}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="shrink-0">
            {selectedLocation ? (
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
            <SelectValue placeholder="Select a location" />
          </p>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="px-2 py-1.5 text-xs font-medium">
            Your Locations
          </SelectLabel>
          {locations?.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              <div className="flex items-center gap-2 py-0.5">
                <span className="truncate">{location.name}</span>
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
              <span className="text-primary">Add Location</span>
            </div>
          </button>
        </BusinessFormDialog>
      </SelectContent>
    </Select>
  )
}
