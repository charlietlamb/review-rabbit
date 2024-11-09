import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Welcome() {
  return (
    <div className="flex flex-col gap-4 items-center py-20">
      <h1 className="text-4xl font-bold font-heading">Welcome to remio!</h1>
      <p className="text-muted-foreground">
        You have successfully subscribed to your plan.
      </p>
      <Button className="w-fit" asChild>
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  )
}
