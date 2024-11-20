import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import useUser from '@/hooks/use-user'

export default function DashboardSidebarFooterLabel() {
  const user = useUser()
  if (!user) return null
  return (
    <DropdownMenuLabel className="p-0 font-normal">
      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        <Avatar className="w-8 h-8 rounded-lg">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-sm leading-tight text-left">
          <span className="font-semibold truncate">{user.name}</span>
          <span className="text-xs truncate">{user.email}</span>
        </div>
      </div>
    </DropdownMenuLabel>
  )
}
