'use client'

import { Button } from '@dubble/design-system/components/ui/button'
import { cn } from '@dubble/design-system/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Spinner from '@dubble/design-system/components/misc/spinner'
import { toast } from 'sonner'

export function ConnectButton({
  providerId,
  className,
}: {
  providerId: string
  className?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/connect/${providerId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )

      if (!response.ok) {
        const text = await response.text()
        console.error('Error response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: text,
        })
        throw new Error(
          `Failed to initiate connection: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()
      router.push(data.redirectURI)
    } catch (error) {
      console.error('Connection error:', error)
      toast.error('Something went wrong', {
        description: 'Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="shine"
      className={cn(
        'relative flex items-center justify-center gap-2',
        className
      )}
      onClick={handleConnect}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : 'Connect'}
    </Button>
  )
}
