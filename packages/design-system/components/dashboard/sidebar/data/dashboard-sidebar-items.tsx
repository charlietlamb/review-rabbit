import { HomeIcon } from '@rabbit/design-system/components/dashboard/sidebar/icons/home'
import { ArchiveIcon } from '../icons/archive'
import { WebhookIcon } from '../icons/webhook'
import { UsersIcon } from '../icons/users'
import { SquareStackIcon } from '../icons/square-stack'

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
  {
    title: 'Automations',
    icon: <SquareStackIcon />,
    href: '/dashboard/automations',
    key: 'automations',
    match: ['automations'],
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
