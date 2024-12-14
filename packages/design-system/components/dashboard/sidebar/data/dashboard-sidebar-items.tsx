import { HomeIcon } from '@remio/design-system/components/dashboard/sidebar/icons/home'
import { SquarePenIcon } from '@remio/design-system/components/dashboard/sidebar/icons/square-pen'
import { CircleDollarSignIcon } from '../icons/dollar'
import { FileStackIcon } from '../icons/files'
import { UsersIcon } from '../icons/users'
import { ClockIcon } from '../icons/clock'

export const dashboardSidebarItemsTop = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    href: '/dashboard/overview',
    key: 'overview',
    match: ['overview'],
  },
  {
    title: 'New Matter',
    icon: <SquarePenIcon />,
    href: '/dashboard/mediation/new',
    key: 'new',
    match: ['new'],
  },
]

export const dashboardSidebarItems = [
  {
    title: 'Clients',
    icon: <UsersIcon />,
    href: '/dashboard/clients',
    key: 'clients',
    match: ['clients', 'client'],
  },
  {
    title: 'Payments',
    icon: <CircleDollarSignIcon />,
    href: '/dashboard/payments',
    key: 'payments',
    match: ['payments'],
  },
  {
    title: 'Files',
    icon: <FileStackIcon />,
    href: '/dashboard/files',
    key: 'files',
    match: ['files'],
  },
  {
    title: 'Schedule',
    icon: <ClockIcon />,
    href: '/dashboard/schedule',
    key: 'schedule',
    match: ['schedule'],
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
