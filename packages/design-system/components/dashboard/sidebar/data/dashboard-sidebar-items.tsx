import { HomeIcon } from '@rabbit/design-system/components/dashboard/sidebar/icons/home'
import { ConnectIcon } from '../icons/connect'
import { ArchiveIcon } from '../icons/archive'
import { WebhookIcon } from '../icons/webhook'

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
    match: ['products', 'product'],
  },
  {
    title: 'Webhooks',
    icon: <WebhookIcon />,
    href: '/dashboard/webhooks',
    key: 'webhooks',
    match: ['webhooks'],
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
