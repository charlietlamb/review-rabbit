import { MediationWithData } from '@remio/database/schema/mediations'
import ClientMultiAvatar from '@remio/design-system/components/dashboard/clients/client-multi-avatar'
import { Button } from '@remio/design-system/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@remio/design-system/components/ui/tooltip'
import MediationAvatar from '@remio/design-system/components/dashboard/mediation/mediation-avatar'
import { format, addMinutes } from 'date-fns'
import {
  UsersRound,
  UserRound,
  Clock,
  Calendar,
  User,
  ArrowUpRight,
} from 'lucide-react'

export default function OverviewScheduleMediation({
  mediation,
}: {
  mediation: MediationWithData
}) {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes ? `${hours}h ${remainingMinutes}min` : `${hours}h`
  }

  return (
    <div className="border flex flex-col rounded-md divide-y">
      <div className="flex gap-1 items-center p-2">
        {mediation.data.length > 1 ? (
          <UsersRound className="text-muted-foreground" />
        ) : (
          <UserRound className="text-muted-foreground" />
        )}
        <div className="text-sm font-medium">{mediation.title}</div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="iconSm" className="ml-auto">
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Mediation</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-col p-2 text-muted-foreground">
        <div className="flex items-center gap-2">
          <UserRound className="size-4 text-muted-foreground" />
          <span className="text-sm">{mediation.data.length} Participants</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground" />
          <span className="text-sm">{formatDuration(mediation.duration)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            {format(mediation.date, 'h:mm a')}
          </div>
          -
          <div className="text-sm text-muted-foreground">
            {format(addMinutes(mediation.date, mediation.duration), 'h:mm a')}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2">
        <MediationAvatar mediation={mediation} />
        <div className="text-sm text-muted-foreground truncate">
          {mediation.data.map((d) => d.client.name).join(', ')}
        </div>
      </div>
    </div>
  )
}
