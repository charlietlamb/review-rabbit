import { HomeIcon } from '@remio/design-system/components/dashboard/sidebar/icons/home'
import { SquarePenIcon } from '@remio/design-system/components/dashboard/sidebar/icons/square-pen'
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
    title: 'Mediations',
    icon: <MessageCircleMoreIcon />,
    href: '/dashboard/mediations',
    key: 'mediations',
    match: ['mediations'],
  },
  {
    title: 'Schedule',
    icon: <ClockIcon />,
    href: '/dashboard/schedule',
    key: 'schedule',
    match: ['schedule'],
  },
  {
    title: 'Notes',
    icon: <NotebookIcon />,
    href: '/dashboard/notes',
    key: 'notes',
    match: ['note', 'notes'],
  },
  {
    title: 'Clients',
    icon: <UsersIcon />,
    href: '/dashboard/clients',
    key: 'clients',
    match: ['clients', 'client'],
  },
  {
    title: 'Invoices',
    icon: <CircleDollarSignIcon />,
    href: '/dashboard/invoices',
    key: 'invoices',
    match: ['invoices'],
  },
  {
    title: 'Files',
    icon: <FileStackIcon />,
    href: '/dashboard/files',
    key: 'files',
    match: ['files'],
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
