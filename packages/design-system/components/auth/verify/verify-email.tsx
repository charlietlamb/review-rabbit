import { ArrowRight } from 'lucide-react'
import { Button } from '@rabbit/design-system/components/ui/button'
import Link from 'next/link'

export function VerifyEmail() {
  return (
    <div className="flex flex-col items-center justify-center p-4 py-20">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-bold text-foreground">
            Email Verified!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your email has been successfully verified. Welcome aboard!
            You&apos;re now ready to explore all the features we offer.
          </p>
        </div>
        <Button variant="shine" colors="none" size="lg">
          <Link href="/dashboard" className="flex items-center gap-2">
            Continue to Dashboard
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
