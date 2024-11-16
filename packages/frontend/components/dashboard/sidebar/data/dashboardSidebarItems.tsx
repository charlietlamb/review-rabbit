import { Download, Home, Speech, Upload } from 'lucide-react'

export const dashboardSidebarItems = [
  {
    title: 'Home',
    icon: <Home />,
    href: '/dashboard',
  },
  {
    title: 'Upload',
    icon: <Upload />,
    href: '/dashboard/upload',
  },
  {
    title: 'Dub',
    icon: <Speech />,
    href: '/dashboard/dub',
  },
  {
    title: 'Results',
    icon: <Download />,
    href: '/dashboard/results',
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
