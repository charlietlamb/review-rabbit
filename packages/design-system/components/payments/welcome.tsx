'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export default function Welcome({ plan }: { plan: string }) {
  const router = useRouter()
  return (
    <div className="relative flex flex-col gap-8 items-center h-screen justify-center">
      <div className="absolute left-0 right-0 -top-[300px] -bottom-20 overflow-hidden pointer-events-none">
        <div
          className="-z-20 relative w-full h-full"
          style={{
            background: `radial-gradient(circle, hsla(var(--primary) / 0.4) 0%, hsla(var(--background) / 0.8) 50%, hsl(var(--background)) 100%)`,
          }}
        />
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Welcome to burse!
        </h1>
        <p className="text-muted-foreground">
          You have successfully subscribed to {plan} plan.
        </p>
      </div>
      <Button className="w-fit" onClick={() => router.push('/dashboard')}>
        Go to dashboard
      </Button>
    </div>
  )
}
