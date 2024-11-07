import { CheckCircle } from 'lucide-react'

export default function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-4">
      <CheckCircle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
      <p className="text-foreground">{text}</p>
    </div>
  )
}
