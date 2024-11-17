import React from 'react'
import Spinner from './spinner'

export default function PageLoading() {
  return (
    <div className="w-full h-full flex-grow flex items-center justify-center py-20">
      <Spinner />
    </div>
  )
}
