import { CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type TermsSectionProps = {
  title: string
  content: string
}

export function TermsSection({ title, content }: TermsSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <CheckCircle className="w-6 h-6 text-primary mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary font-heading">
              {title}
            </h2>
            <p className="text-muted-foreground">{content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
