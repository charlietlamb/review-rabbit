import { logout } from '@/actions/auth/auth/logout'
import { userAtom } from '@/atoms/user/user-atom'
import { authClient } from '@/authClient'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useSetAtom } from 'jotai'
import { Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardSidebarFooterDropdown() {
  const router = useRouter()
  const setUser = useSetAtom(userAtom)
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => router.push('/pricing')}>
          <Sparkles />
          Upgrade to Pro
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings/account')}
        >
          <BadgeCheck />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => logout().then(() => setUser(null))}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </>
  )
}
