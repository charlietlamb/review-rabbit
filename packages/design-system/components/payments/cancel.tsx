import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Cancel() {
  return (
    <div className="flex flex-col items-center py-20 gap-8">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Something went wrong with your payment
        </h1>
        <p className="text-muted-foreground">
          Please try again or contact support.
        </p>
      </div>
      <Button className="w-fit" asChild>
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  )
}
