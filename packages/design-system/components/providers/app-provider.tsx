'use client'

import { useAtom } from 'jotai'
import { selectedBusinessAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atoms'
import { selectedLocationAtom } from '@rabbit/design-system/atoms/dashboard/location/location-atoms'
import { useEffect } from 'react'
import Spinner from '@rabbit/design-system/components/misc/spinner'

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [business, setBusiness] = useAtom(selectedBusinessAtom)
  const [location, setLocation] = useAtom(selectedLocationAtom)

  useEffect(() => {
    if (!business) {
      setBusiness(business)
    }
  }, [setBusiness])

  useEffect(() => {
    if (!location) {
      setLocation(location)
    }
  }, [setLocation])

  return <>{children}</>
  if (!business) {
    return (
      <div className="bg-background w-full h-full flex items-center justify-center flex-grow">
        <div className="flex flex-col items-center justify-center gap-4">
          <Spinner className="size-8" />
          <p className="text-lg font-heading">Loading business...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
