import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Cancel() {
  return (
    <div className="flex flex-col gap-4 items-center py-20">
      <h1 className="text-4xl font-bold font-heading">
        Something went wrong with your payment
      </h1>
      <p className="text-muted-foreground">
        Please try again or contact support.
      </p>
      <Button className="w-fit" asChild>
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  )
}
