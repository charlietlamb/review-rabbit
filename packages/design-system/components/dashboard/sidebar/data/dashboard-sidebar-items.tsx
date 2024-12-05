import { WorkflowIcon } from '@remio/design-system/components/dashboard/sidebar/icons/workflow'
import { HomeIcon } from '@remio/design-system/components/dashboard/sidebar/icons/home'
import { LinkIcon } from '@remio/design-system/components/dashboard/sidebar/icons/link'
import { SparklesIcon } from '@remio/design-system/components/dashboard/sidebar/icons/sparkles'
import { SquarePenIcon } from '@remio/design-system/components/dashboard/sidebar/icons/square-pen'

export const dashboardSidebarItemsTop = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    href: '/dashboard',
    key: 'dashboard',
  },
  {
    title: 'New Matter',
    icon: <SquarePenIcon />,
    href: '/dashboard/new',
    key: 'new',
  },
]

export const dashboardSidebarItems = [
  {
    title: 'Flow',
    icon: <WorkflowIcon />,
    href: '/dashboard/flow',
    key: 'flow',
  },
  {
    title: 'Upload',
    icon: <SparklesIcon />,
    href: '/dashboard/upload',
    key: 'upload',
  },
  {
    title: 'Connect',
    icon: <LinkIcon />,
    href: '/dashboard/connect',
    key: 'connect',
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
