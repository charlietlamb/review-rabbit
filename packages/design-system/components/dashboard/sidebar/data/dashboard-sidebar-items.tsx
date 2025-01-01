import { HomeIcon } from '@rabbit/design-system/components/dashboard/sidebar/icons/home'
import { UsersIcon } from '../icons/users'
import { SquareStackIcon } from '../icons/square-stack'
import { NotebookIcon } from '../icons/notebook'

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
    icon: <NotebookIcon />,
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
  {
    title: 'Clients',
    icon: <UsersIcon />,
    href: '/dashboard/clients',
    key: 'clients',
    match: ['clients'],
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
