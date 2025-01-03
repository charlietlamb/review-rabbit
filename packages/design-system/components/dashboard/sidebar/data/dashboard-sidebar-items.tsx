import { HomeIcon } from '@rabbit/design-system/components/dashboard/sidebar/icons/home'
import { UsersIcon } from '../icons/users'
import { NotebookIcon } from '../icons/notebook'
import { WorkflowIcon } from '../icons/workflow'
import { RabbitIcon } from '../icons/rabbit'
import { ClockIcon } from '../icons/clock'

export const dashboardSidebarItemsTop = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    href: '/dashboard',
    key: 'overview',
    match: [''],
  },
  {
    title: 'Schedule',
    icon: <ClockIcon />,
    href: '/dashboard/schedule',
    key: 'schedule',
    match: ['schedule'],
  },
]

export const dashboardSidebarItems = [
  {
    title: 'Automations',
    icon: <RabbitIcon />,
    href: '/dashboard/automations',
    key: 'automations',
    match: ['automations'],
  },
  {
    title: 'Workflows',
    icon: <WorkflowIcon />,
    href: '/dashboard/workflows',
    key: 'workflows',
    match: ['workflows'],
  },
  {
    title: 'Business',
    icon: <NotebookIcon />,
    href: '/dashboard/business',
    key: 'business',
    match: ['business'],
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
