import { Button } from '@burse/design-system/components/ui/button'
import { RiGoogleFill } from '@remixicon/react'
import { authClient } from '@burse/design-system/lib/authClient'
import { useState } from 'react'
import { toast } from 'sonner'
import Spinner from '@burse/design-system/components/misc/spinner'

export default function OAuth() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        className="flex-1 font-medium font-headingflex items-center gap-2"
        colors="outline"
        aria-label="Login with Google"
        size="icon"
        onClick={() => {
          setLoading(true)
          toast('Signing in with Google...', {
            description: 'Redirecting to Google...',
          })
          authClient.signIn.social({ provider: 'google' })
          setLoading(false)
        }}
      >
        <RiGoogleFill
          size={16}
          aria-hidden="true"
          className="text-foreground"
        />
        {loading ? <Spinner /> : 'Sign In with Google'}
      </Button>
    </div>
  )
}
