'use client'

import type { AnimationControls } from 'motion/react'
import {
  Card,
  CardContent,
  CardHeader,
} from '@ff/design-system/components/ui/card'
import { useRouter } from 'next/navigation'

export default function CreateOption({
  icon,
  name,
  controls,
  providers,
}: {
  icon: React.ReactNode
  name: string
  controls: AnimationControls
  providers: {
    icon: React.ReactNode
    name: string
  }[]
}) {
  const router = useRouter()
  return (
    <Card
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex flex-col justify-center bg-background"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      onClick={() => router.push(`/dashboard/create/${name.toLowerCase()}`)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>{icon}</div>
          <div>
            <p className="text-lg font-heading font-bold">{name}</p>
            <div className="flex items-center gap-2">
              {providers.map((provider) => (
                <div key={provider.name}>{provider.icon}</div>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Create a new {name}. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Reprehenderit veritatis maiores, tenetur cum
          temporibus reiciendis. Id reiciendis ex ab, dicta sint molestias
          voluptate nihil corporis sed, amet incidunt nesciunt a.
        </p>
      </CardContent>
    </Card>
  )
}
