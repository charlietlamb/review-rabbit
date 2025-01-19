'use client'

import {
  SidebarHeader,
  useSidebar,
} from '@rabbit/design-system/components/ui/sidebar'
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
import BusinessAvatar from '../../business/business-avatar'
import { cn } from '@rabbit/design-system/lib/utils'
import { useAtom } from 'jotai'
import { selectedBusinessAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atoms'
import { Plus, ChevronDown, Home } from 'lucide-react'
import BusinessFormDialog from '../../business/business-form-dialog'
import { Skeleton } from '@rabbit/design-system/components/ui/skeleton'
import { BusinessWithLocations } from '@rabbit/database/types/business-location-types'

export default function DashboardSidebarHeader() {
  const { open } = useSidebar()
  const [selectedBusiness, setSelectedBusiness] = useAtom(selectedBusinessAtom)

  const { data: businesses, isLoading } = useQuery<BusinessWithLocations[]>({
    queryKey: QUERY_KEYS.BUSINESS,
    queryFn: async () => {
      const result = await getBusinesses(0)
      return result
    },
  })

  if (isLoading) {
    return (
      <SidebarHeader className="p-0 h-[65px] border-b">
        <div className="flex items-center gap-2 p-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </SidebarHeader>
    )
  }

  const currentBusiness = businesses?.find((b) => b.id === selectedBusiness?.id)

  return (
    <SidebarHeader
      className={cn(
        'p-0 h-[65px] border-b group/header hover:text-primary',
        !open && 'p-1'
      )}
    >
      {open ? (
        <Select
          value={selectedBusiness?.id}
          onValueChange={(value) => {
            const business = businesses?.find((b) => b.id === value)
            if (business) setSelectedBusiness(business)
          }}
        >
          <SelectTrigger
            className={cn(
              'w-full h-full border-0 rounded-none bg-gradient-to-l from-background via-background to-primary/5',
              'hover:to-primary/10 transition-all duration-300 px-3 [&>svg]:hidden'
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="shrink-0">
                {currentBusiness ? (
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <Home className="h-4 w-4 text-primary" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <Plus className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
              <p className="text-sm font-medium font-heading text-muted-foreground group-hover/header:text-primary">
                <SelectValue placeholder="Select a business" />
              </p>
              <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50 group-hover/header:text-primary group-hover/header:opacity-100 transition-all" />
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
      ) : currentBusiness ? (
        <div className="h-full w-full flex items-center justify-center">
          <BusinessAvatar business={currentBusiness} className="h-8 w-8" />
        </div>
      ) : (
        <BusinessFormDialog>
          <div className="h-full w-full flex items-center justify-center group">
            <button className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Plus className="h-4 w-4 text-primary group-hover:text-primary/80" />
            </button>
          </div>
        </BusinessFormDialog>
      )}
    </SidebarHeader>
  )
}
