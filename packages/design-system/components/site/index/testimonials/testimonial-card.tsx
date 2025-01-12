import Image from 'next/image'
import { Card } from '@rabbit/design-system/components/ui/card'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  name: string
  handle: string
  imageUrl: string
}

export function TestimonialCard({
  quote,
  name,
  handle,
  imageUrl,
}: TestimonialCardProps) {
  return (
    <Card className="relative h-full overflow-hidden border bg-card p-8 transition-all hover:border-primary/50">
      {/* Quote */}
      <div className="relative space-y-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-primary text-primary"
              strokeWidth={1}
            />
          ))}
        </div>
        <blockquote className="text-base text-muted-foreground">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>

      {/* Author */}
      <div className="relative mt-6 flex items-center gap-4 pt-6 border-t">
        <div className="relative h-10 w-10 flex-shrink-0">
          <Image
            alt={`${name}'s picture`}
            src={imageUrl}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">{handle}</p>
        </div>
      </div>
    </Card>
  )
}
