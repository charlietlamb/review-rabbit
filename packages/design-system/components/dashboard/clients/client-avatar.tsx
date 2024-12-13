import { Client } from '@remio/database'
import {
  Avatar,
  AvatarFallback,
} from '@remio/design-system/components/ui/avatar'

export default function ClientAvatar({
  client,
  className,
}: {
  client: Client
  className?: string
}) {
  return (
    <Avatar className={className}>
      <AvatarFallback>
        {client.name.split(' ')[0][0] + client.name.split(' ')[1][0]}
      </AvatarFallback>
    </Avatar>
  )
}
