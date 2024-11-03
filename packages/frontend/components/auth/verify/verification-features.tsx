import { CheckCircle } from 'lucide-react'

type FeatureItemProps = {
  text: string
}

function FeatureItem({ text }: FeatureItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
      <p className="text-foreground">{text}</p>
    </div>
  )
}

export function VerificationFeatures() {
  return (
    <div className="space-y-4 text-left">
      <FeatureItem text="Your account is now secure and protected." />
      <FeatureItem text="You can now access all areas of your account." />
      <FeatureItem text="Don't forget to complete your profile for a personalized experience." />
    </div>
  )
}
