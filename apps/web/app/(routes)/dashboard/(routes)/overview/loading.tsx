import React from 'react'
import { Skeleton } from '@remio/design-system/components/ui/skeleton'

export default function OverviewLoading() {
  return (
    <div className="flex flex-col divide-y">
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-2/3 h-4" />
        </div>
        <Skeleton className="w-1/2 h-10" />
      </div>

      <div className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-4 p-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="w-full h-32" />
        ))}
      </div>

      <div className="md:grid-cols-2 grid grid-cols-1 gap-6 p-6">
        <div>
          <Skeleton className="h-96 w-full" />
        </div>

        <div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  )
}
