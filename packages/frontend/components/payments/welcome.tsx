import React from 'react'
import { Button } from '../ui/button'

export default function Welcome() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold font-heading">Welcome to remoio!</h1>
      <Button>Go to dashboard</Button>
    </div>
  )
}
