import { Download, Home, Link, Speech, Upload, Workflow } from 'lucide-react'

export const dashboardSidebarItems = [
  {
    title: 'Dub',
    icon: <Speech />,
    href: '/dashboard/dub',
  },
  {
    title: 'Flow',
    icon: <Workflow />,
    href: '/dashboard/flow',
  },
  {
    title: 'Upload',
    icon: <Upload />,
    href: '/dashboard/upload',
  },
  {
    title: 'Connect',
    icon: <Link />,
    href: '/dashboard/connect',
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
