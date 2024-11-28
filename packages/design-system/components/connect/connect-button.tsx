'use client'

import { Button } from '@dubble/design-system/components/ui/button'
import { cn } from '@dubble/design-system/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Spinner from '@dubble/design-system/components/misc/spinner'

interface ConnectButtonProps {
  providerId: string
  icon?: React.ReactNode
  isConnected?: boolean
  className?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function ConnectButton({
  providerId,
  icon,
  isConnected,
  className,
  onSuccess,
  onError,
}: ConnectButtonProps) {
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
      console.log('Authorization URL data:', data)
      router.push(data.redirectURI)
      onSuccess?.()
    } catch (error) {
      console.error('Connection error:', error)
      onError?.(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  // Provider-specific styles
  const providerStyles = {
    instagram:
      'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
    google: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
  }

  return (
    <Button
      variant={isConnected ? 'outline' : 'default'}
      className={cn(
        'relative flex items-center justify-center gap-2',
        providerStyles[providerId as keyof typeof providerStyles],
        className
      )}
      onClick={handleConnect}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : icon}
      {isConnected ? 'Connected' : 'Connect'}
    </Button>
  )
}
