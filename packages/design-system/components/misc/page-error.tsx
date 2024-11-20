import React from 'react'

export default function PageError({ error }: { error: string }) {
  return (
    <div className="w-full h-full flex-grow flex items-center justify-center">
      <div className="text-red-500 font-semibold font-heading">{error}</div>
    </div>
  )
}
