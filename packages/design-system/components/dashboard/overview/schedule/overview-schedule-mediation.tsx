import { MediationWithData } from '@remio/database/schema/mediations'
import ClientMultiAvatar from '@remio/design-system/components/dashboard/clients/client-multi-avatar'
import { format, addMinutes } from 'date-fns'
import { UsersRound, UserRound } from 'lucide-react'

export default function OverviewScheduleMediation({
  mediation,
}: {
  mediation: MediationWithData
}) {
  return (
    <div className="bg-popover flex flex-col p-2 rounded-md gap-2">
      <div className="flex gap-1 items-center">
        {mediation.data.length > 1 ? (
          <UsersRound className="text-muted-foreground" />
        ) : (
          <UserRound className="text-muted-foreground" />
        )}
        <div className="text-sm font-medium">{mediation.title}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          {format(mediation.date, 'h:mm a')}
        </div>
        -
        <div className="text-sm text-muted-foreground">
          {format(addMinutes(mediation.date, mediation.duration), 'h:mm a')}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <ClientMultiAvatar clients={mediation.data.map((d) => d.client)} />
        <div className="text-sm text-muted-foreground truncate">
          {mediation.data.map((d) => d.client.name).join(', ')}
        </div>
      </div>
    </div>
  )
}
