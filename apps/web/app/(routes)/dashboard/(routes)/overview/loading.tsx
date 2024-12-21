import React from 'react'
import Spinner from '@remio/design-system/components/misc/spinner'

export default function OverviewLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full flex-grow">
      <Spinner />
    </div>
  )
}
