import { Download, Home, Speech, Upload } from 'lucide-react'

export const dashboardSidebarItems = [
  {
    title: 'Dub',
    icon: <Speech />,
    href: '/dashboard/dub',
  },
  {
    title: 'Upload',
    icon: <Upload />,
    href: '/dashboard/upload',
  },
  {
    title: 'Results',
    icon: <Download />,
    href: '/dashboard/results',
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
