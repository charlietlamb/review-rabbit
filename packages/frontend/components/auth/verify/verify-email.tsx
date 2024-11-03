import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VerificationHeader } from './verification-header'
import { VerificationFeatures } from './verification-features'

export function VerifyEmail() {
  return (
    <div className="flex flex-col items-center justify-center p-4 py-20">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-2">
          <VerificationHeader />
          <p className="text-lg text-muted-foreground">
            Your email has been successfully verified. Welcome aboard!
            You&apos;re now ready to explore all the features we offer.
          </p>
        </div>
        <Button variant="shine" color="ghost" size="lg">
          Continue to Dashboard
          <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
        <VerificationFeatures />
      </div>
    </div>
  )
}
