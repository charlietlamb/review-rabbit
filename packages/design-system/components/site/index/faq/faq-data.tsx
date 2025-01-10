import {
  Star,
  MessageSquare,
  TrendingUp,
  Bell,
  Zap,
  BarChart,
  Settings,
  Users,
  HelpCircle,
  Shield,
  Gauge,
  CircleDashed,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface FaqCollapsible {
  title: string
  content: string
  icon: LucideIcon
  open?: boolean
}

interface FaqItem {
  id: string
  title: string
  icon: LucideIcon
  collapsibles: FaqCollapsible[]
}

export const faqData: FaqItem[] = [
  {
    id: '1',
    title: 'How does Review Management work?',
    icon: Star,
    collapsibles: [
      {
        title: 'What reviews can I manage?',
        content:
          'Our platform currently supports Google Reviews management, allowing you to monitor, respond to, and analyze all your Google Reviews from a centralized dashboard.',
        icon: HelpCircle,
        open: true,
      },
      {
        title: 'How does the response system work?',
        content:
          'Our AI-powered system helps craft professional responses while maintaining your brand voice. You can also create custom templates and manually edit any response before sending.',
        icon: MessageSquare,
      },
    ],
  },
  {
    id: '2',
    title: 'Tell me about Reputation Growth features',
    icon: TrendingUp,
    collapsibles: [
      {
        title: 'How does the review request timing work?',
        content:
          'Our smart timing system analyzes customer interaction patterns to identify the optimal moment to request reviews, maximizing response rates and positive feedback.',
        icon: Gauge,
        open: true,
      },
      {
        title: 'What strategies are implemented?',
        content:
          'We use a combination of automated review requests, personalized follow-ups, and sentiment analysis to consistently improve your rating and review quality.',
        icon: CircleDashed,
      },
    ],
  },
  {
    id: '3',
    title: 'How secure is the platform?',
    icon: Shield,
    collapsibles: [
      {
        title: 'How is my data protected?',
        content:
          'We implement enterprise-grade security measures to protect your data, including encryption at rest and in transit, regular security audits, and strict access controls.',
        icon: Shield,
        open: true,
      },
      {
        title: 'What about customer privacy?',
        content:
          'We handle all customer data in compliance with GDPR and other privacy regulations. Your customer data is never shared or sold to third parties.',
        icon: Users,
      },
    ],
  },
  {
    id: '4',
    title: 'What analytics and reporting features are available?',
    icon: BarChart,
    collapsibles: [
      {
        title: 'What metrics can I track?',
        content:
          'Track key metrics including response times, rating trends, sentiment scores, and customer satisfaction levels. Compare your performance against industry benchmarks.',
        icon: Gauge,
        open: true,
      },
      {
        title: 'How can I use the insights?',
        content:
          'Our analytics dashboard provides actionable insights to improve your service quality, identify patterns in customer feedback, and make data-driven business decisions.',
        icon: CircleDashed,
      },
    ],
  },
]
