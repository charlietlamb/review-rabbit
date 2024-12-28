import { HomeIcon } from '@burse/design-system/components/dashboard/sidebar/icons/home'
import { ConnectIcon } from '../icons/connect'
import { ArchiveIcon } from '../icons/archive'

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
    icon: <ConnectIcon />,
    href: '/dashboard/stripe',
    key: 'stripe',
    match: ['stripe'],
  },
  {
    title: 'Products',
    icon: <ArchiveIcon />,
    href: '/dashboard/products',
    key: 'products',
    match: ['products'],
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
