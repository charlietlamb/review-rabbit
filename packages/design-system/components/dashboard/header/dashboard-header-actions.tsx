'use client'
import { Button } from '@rabbit/design-system/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@rabbit/design-system/components/ui/tooltip'
import { ExternalLink, MessageCircleQuestion } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardHeaderActions() {
  const router = useRouter()
  return (
    <div className="md:flex items-center gap-2 hidden">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="xs"
            variant="foreground"
            className="flex items-center gap-1"
            onClick={() => router.push('/pricing')}
          >
            Upgrade
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upgrade your plan</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="xs"
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => window.open('mailto:charlie@reviewrabbit.uk')}
          >
            <MessageCircleQuestion className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Help</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="xs"
            variant="outline"
            className="flex items-center gap-1"
            onClick={() =>
              window.open('https://dashboard.google.com', '_blank')
            }
          >
            <ExternalLink className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Visit Google Dashboard</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
