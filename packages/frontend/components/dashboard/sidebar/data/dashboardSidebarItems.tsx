import { BarChart, Calendar, Home, Link, Upload } from 'lucide-react'

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
    title: 'Analytics',
    icon: <BarChart />,
    href: '/dashboard/analytics',
  },
]

export type DashboardSidebarItem = (typeof dashboardSidebarItems)[number]
