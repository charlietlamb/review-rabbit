import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

type TestimonialCardProps = {
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
    <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
      <CardContent className="flex flex-col items-start gap-4 divide-y p-7">
        <p className="text-foreground">&quot;{quote}&quot;</p>
        <div className="flex items-center gap-4 w-full pt-4">
          <div className="relative size-10">
            <Image
              alt={`${name}'s picture`}
              src={imageUrl}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold leading-none text-foreground">{name}</p>
            <p className="mt-1 leading-none text-muted-foreground">{handle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
