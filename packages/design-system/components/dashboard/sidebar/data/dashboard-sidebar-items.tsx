import { HomeIcon } from '@burse/design-system/components/dashboard/sidebar/icons/home'
import { SquarePenIcon } from '@burse/design-system/components/dashboard/sidebar/icons/square-pen'
import { CircleDollarSignIcon } from '../icons/dollar'
import { FileStackIcon } from '../icons/files'
import { UsersIcon } from '../icons/users'
import { ClockIcon } from '../icons/clock'
import { NotebookIcon } from '../icons/notebook'
import { MessageCircleMoreIcon } from '../icons/message'

export const dashboardSidebarItemsTop = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    href: '/dashboard',
    key: 'overview',
    match: [''],
  },
]

export const dashboardSidebarItems = [
  {
    title: 'Stripe',
    icon: <UsersIcon />,
    href: '/dashboard/stripe',
    key: 'stripe',
    match: ['stripe'],
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
