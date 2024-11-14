import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Welcome() {
  return (
    <div className="flex flex-col gap-8 items-center py-20">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Welcome to dubble!
        </h1>
        <p className="text-muted-foreground">
          You have successfully subscribed to your plan.
        </p>
      </div>
      <Button className="w-fit" asChild>
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  )
}
