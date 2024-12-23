import {
  Calendar,
  Users,
  FileText,
  Mail,
  Receipt,
  Clock,
  Shield,
  Settings,
  Wallet,
  ChartSpline,
} from 'lucide-react'

export const featuresData = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description:
      'Efficiently manage and schedule mediations with an intuitive calendar.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-l lg:border-b',
  },
  {
    icon: Users,
    title: 'Client Management',
    description:
      'Handle multiple clients per mediation with detailed profiles.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: FileText,
    title: 'Digital Notes',
    description: 'Create and manage detailed notes for each mediation session.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Receipt,
    title: 'Automated Invoicing',
    description: 'Generate and manage invoices for each client automatically.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Mail,
    title: 'Email Notifications',
    description: 'Send automated confirmation emails to all participants.',
    position: 'bottom' as const,
    className: 'lg:border-r lg:border-l',
  },
  {
    icon: Wallet,
    title: 'Stripe Payments',
    description: 'Accept secure online payments through Stripe integration.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
  {
    icon: ChartSpline,
    title: 'Analytics Dashboard',
    description: 'Track revenue, clients and business metrics in real-time.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
  {
    icon: Settings,
    title: 'Customizable',
    description: 'Adapt the platform to your specific mediation needs.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
] as const
