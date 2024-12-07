import { authClient } from '@remio/design-system/lib/authClient'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@remio/design-system/components/ui/dropdown-menu'
import {
  Sparkles,
  BadgeCheck,
  CreditCard,
  Bell,
  LogOut,
  Wallet,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardSidebarFooterDropdown() {
  const router = useRouter()
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => router.push('/pricing')}
          className="cursor-pointer"
        >
          <Sparkles />
          Upgrade to Pro
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings/account')}
          className="cursor-pointer"
        >
          <BadgeCheck />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings/stripe')}
          className="cursor-pointer"
        >
          <Wallet />
          Stripe
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings/billing')}
          className="cursor-pointer"
        >
          <CreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings/notifications')}
          className="cursor-pointer"
        >
          <Bell />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push('/'),
            },
          })
        }}
        className="cursor-pointer"
      >
        <LogOut />
        Log out
      </DropdownMenuItem>
    </>
  )
}
