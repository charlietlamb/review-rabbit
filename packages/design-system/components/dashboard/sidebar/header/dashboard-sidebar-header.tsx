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
import { selectedBusinessAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atom'
import { Plus } from 'lucide-react'
import BusinessFormDialog from '../../business/business-form-dialog'
import { Skeleton } from '@rabbit/design-system/components/ui/skeleton'
import { Business } from '@rabbit/database/schema/app/businesses'

const ADD_BUSINESS_VALUE = 'add-business'

export default function DashboardSidebarHeader() {
  const { open } = useSidebar()
  const [selectedBusiness, setSelectedBusiness] = useAtom(selectedBusinessAtom)

  const { data: businesses, isLoading } = useQuery<Business[]>({
    queryKey: QUERY_KEYS.BUSINESS,
    queryFn: async () => {
      const result = await getBusinesses(0)
      return result
    },
  })

  if (isLoading) {
    return (
      <SidebarHeader className="p-2 border-b">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </SidebarHeader>
    )
  }

  const currentBusiness = businesses?.find((b) => b.id === selectedBusiness)

  const handleValueChange = (value: string) => {
    if (value === ADD_BUSINESS_VALUE) return
    setSelectedBusiness(value)
  }

  return (
    <SidebarHeader className={cn('p-2 border-b', !open && 'p-1')}>
      {open ? (
        <Select value={selectedBusiness} onValueChange={handleValueChange}>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              {currentBusiness && (
                <BusinessAvatar
                  business={currentBusiness}
                  className="h-8 w-8"
                />
              )}
              <SelectValue placeholder="Select a business" />
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
            <SelectSeparator className="my-1" />
            <BusinessFormDialog>
              <SelectItem
                value={ADD_BUSINESS_VALUE}
                className="text-primary hover:text-primary"
              >
                <div className="flex items-center gap-2 py-0.5">
                  <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Plus className="h-4 w-4" />
                  </div>
                  <span>Add Business</span>
                </div>
              </SelectItem>
            </BusinessFormDialog>
          </SelectContent>
        </Select>
      ) : currentBusiness ? (
        <BusinessAvatar business={currentBusiness} className="h-8 w-8" />
      ) : (
        <BusinessFormDialog>
          <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-accent">
            <Plus className="h-4 w-4" />
          </button>
        </BusinessFormDialog>
      )}
    </SidebarHeader>
  )
}
