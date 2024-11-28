'use client'

import { ConnectButton } from '../connect-button'
import { toast } from 'sonner'

export function GoogleConnect() {
  return (
    <ConnectButton
      providerId="google"
      icon="google"
      onError={(error) => {
        toast.error('Failed to connect', {
          description: error,
        })
      }}
    />
  )
}
