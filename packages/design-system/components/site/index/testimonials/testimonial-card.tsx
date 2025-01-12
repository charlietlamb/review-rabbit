import Image from 'next/image'
import { Card } from '@rabbit/design-system/components/ui/card'
import { Star } from 'lucide-react'
import { cn } from '@rabbit/design-system/lib/utils'

interface TestimonialCardProps {
  quote: string
  name: string
  handle: string
  imageUrl: string
  showStars?: boolean
  reverse?: boolean
  showSeparator?: boolean
  className?: string
}

export function TestimonialCard({
  quote,
  name,
  handle,
  imageUrl,
  showStars = true,
  reverse = false,
  showSeparator = true,
  className,
}: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        'relative font-heading flex p-6 transition-all duration-300',
        'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent',
        'border-2 rounded-3xl',
        'border-primary/20 hover:border-primary',
        reverse ? 'flex-col-reverse gap-8' : 'flex-col gap-8',
        className
      )}
    >
      {/* Quote */}
      <div className="overflow-hidden">
        {showStars && (
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-primary text-primary"
                strokeWidth={1}
              />
            ))}
          </div>
        )}
        <blockquote className="text-base text-foreground leading-relaxed line-clamp-4">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>

      {/* Author */}
      <div
        className={cn(
          'flex items-center gap-4 flex-shrink-0',
          !reverse && showSeparator && 'border-t border-primary/10 pt-6'
        )}
      >
        <div className="relative h-10 w-10 flex-shrink-0">
          <Image
            alt={`${name}'s picture`}
            src={imageUrl}
            fill
            className="rounded-full object-cover ring-2 ring-primary/10"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium leading-none text-foreground">
            {name}
          </p>
          <p className="text-sm text-muted-foreground">{handle}</p>
        </div>
      </div>
    </Card>
  )
}
