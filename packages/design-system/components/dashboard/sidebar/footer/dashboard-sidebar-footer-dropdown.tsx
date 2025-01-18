'use client'

import { authClient } from '@rabbit/design-system/lib/auth-client'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@rabbit/design-system/components/ui/dropdown-menu'
import { Sparkles, BadgeCheck, CreditCard, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStripeDetails } from '@rabbit/design-system/hooks/use-stripe-details'

export default function DashboardSidebarFooterDropdown() {
  const router = useRouter()
  const stripeDetails = useStripeDetails()
  const isPro =
    stripeDetails?.status === 'active' && stripeDetails?.plan === 'pro'
  return (
    <>
      {!isPro && (
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push('/pricing')}
            className="cursor-pointer group/item"
          >
            <Sparkles className="mr-2 size-4 text-primary" />
            <span className="font-medium group-hover/item:text-primary transition-colors">
              Upgrade to Pro
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      )}
      <DropdownMenuSeparator className="bg-border/50" />
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings/account')}
          className="cursor-pointer group/item"
        >
          <BadgeCheck className="mr-2 size-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
          <span className="group-hover/item:text-primary transition-colors">
            Account
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings/billing')}
          className="cursor-pointer group/item"
        >
          <CreditCard className="mr-2 size-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
          <span className="group-hover/item:text-primary transition-colors">
            Billing & Plans
          </span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator className="bg-border/50" />
      <DropdownMenuItem
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push('/'),
            },
          })
        }}
        className="cursor-pointer group/item"
      >
        <LogOut className="mr-2 size-4 text-red-500/90 group-hover/item:text-red-500 transition-colors" />
        <span className="text-red-500/70 group-hover/item:text-red-500 transition-colors">
          Log out
        </span>
      </DropdownMenuItem>
    </>
  )
}
