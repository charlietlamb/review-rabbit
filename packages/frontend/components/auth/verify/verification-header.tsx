import { CheckCircle } from 'lucide-react'

export function VerificationHeader() {
  return (
    <div className="flex items-center justify-center space-x-4">
      <CheckCircle className="h-10 w-10 text-primary" />
      <h1 className="font-heading text-4xl font-bold text-foreground">
        Email Verified!
      </h1>
    </div>
  )
}
