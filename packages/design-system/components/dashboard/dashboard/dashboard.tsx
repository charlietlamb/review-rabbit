'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Dashboard({ status }: { status?: string }) {
  useEffect(() => {
    if (status === 'onboarding-completed') {
      toast.success('Welcome to Burse!', {
        description: "You've successfully connected your stripe account!",
      })
    }
  }, [status])
  return <div>dashboard</div>
}
