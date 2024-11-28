'use client'

import { ConnectButton } from '../connect-button'
import { toast } from 'sonner'
import { RiInstagramFill } from 'react-icons/ri'

export function InstagramConnect() {
  return (
    <ConnectButton
      providerId="instagram"
      icon={<RiInstagramFill className="h-4 w-4" />}
      onError={(error) => {
        toast.error('Failed to connect', {
          description: error,
        })
      }}
    />
  )
}
