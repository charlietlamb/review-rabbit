import {
  Star,
  MessageSquare,
  TrendingUp,
  Bell,
  Zap,
  BarChart,
  Settings,
  Users,
} from 'lucide-react'

export const featuresData = [
  {
    icon: Star,
    title: 'Review Management',
    description:
      'Easily monitor and respond to all your Google Reviews from one dashboard.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-l lg:border-b',
  },
  {
    icon: TrendingUp,
    title: 'Reputation Growth',
    description:
      'Proven strategies to increase your positive reviews and overall rating.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: MessageSquare,
    title: 'Smart Responses',
    description:
      'AI-powered response suggestions help you engage with customers professionally and quickly.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Users,
    title: 'Customer Insights',
    description:
      'Understand customer sentiment and identify trends in feedback.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description:
      'Get notified immediately when new reviews need your attention.',
    position: 'bottom' as const,
    className: 'lg:border-r lg:border-l',
  },
  {
    icon: Zap,
    title: 'Quick Setup',
    description: 'Connect your Google Business Profile in a couple of clicks.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
  {
    icon: BarChart,
    title: 'Performance Metrics',
    description:
      'Track your rating growth and response times with easy reports.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
  {
    icon: Settings,
    title: 'Customizable',
    description:
      'Tailor notification settings and response templates to your needs.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
] as const
