import { Button } from '@remio/design-system/components/ui/button'
import { RiGoogleFill } from '@remixicon/react'
import { authClient } from '@remio/design-system/lib/authClient'

export default function OAuth() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        className="flex-1"
        colors="outline"
        aria-label="Login with Google"
        size="icon"
        onClick={() => authClient.signIn.social('google')}
      >
        <RiGoogleFill
          size={16}
          aria-hidden="true"
          className="text-foreground"
        />
        Sign In with Google
      </Button>
    </div>
  )
}
