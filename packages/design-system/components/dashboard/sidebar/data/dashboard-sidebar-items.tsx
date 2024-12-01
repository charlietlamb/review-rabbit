import { WorkflowIcon } from '@ff/design-system/components/dashboard/sidebar/icons/workflow'
import { HomeIcon } from '@ff/design-system/components/dashboard/sidebar/icons/home'
import { LinkIcon } from '@ff/design-system/components/dashboard/sidebar/icons/link'
import { SparklesIcon } from '@ff/design-system/components/dashboard/sidebar/icons/sparkles'
import { SquarePenIcon } from '@ff/design-system/components/dashboard/sidebar/icons/square-pen'

export const dashboardSidebarItems = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    href: '/dashboard',
    key: 'home',
  },
  {
    title: 'Create',
    icon: <SquarePenIcon />,
    href: '/dashboard/create',
    key: 'create',
  },
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
