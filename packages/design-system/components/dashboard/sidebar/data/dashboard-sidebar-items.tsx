import { HomeIcon } from '@rabbit/design-system/components/dashboard/sidebar/icons/home'
import { ArchiveIcon } from '../icons/archive'
import { WebhookIcon } from '../icons/webhook'
import { UsersIcon } from '../icons/users'

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
    title: 'Business',
    icon: <UsersIcon />,
    href: '/dashboard/business',
    key: 'business',
    match: ['business'],
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
