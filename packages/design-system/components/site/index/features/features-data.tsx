import {
  CreditCard,
  Webhook,
  Globe,
  Shield,
  Zap,
  BarChart,
  Settings,
  Clock,
} from 'lucide-react'

export const featuresData = [
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description:
      'Accept payments globally with support for multiple currencies and payment methods.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-l lg:border-b',
  },
  {
    icon: Webhook,
    title: 'Webhook Management',
    description:
      'Automated webhook handling with retry logic and event persistence.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description:
      'Support for international payments and regional payment methods.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Built-in fraud prevention and PCI compliance.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Zap,
    title: 'Real-time Events',
    description: 'Instant notifications for payment and webhook events.',
    position: 'bottom' as const,
    className: 'lg:border-r lg:border-l',
  },
  {
    icon: Clock,
    title: 'Quick Setup',
    description: 'Get started with Stripe integration in minutes.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Track payment metrics and webhook performance.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
  {
    icon: Settings,
    title: 'Customizable',
    description: 'Flexible configuration for your payment needs.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
] as const
