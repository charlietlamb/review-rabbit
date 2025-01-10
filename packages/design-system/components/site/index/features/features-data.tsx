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
import type { Feature } from './feature-card'

export const featuresData: Feature[] = [
  {
    icon: Star,
    title: 'Review Management',
    description:
      'Take control of your online reputation with our comprehensive review management dashboard. Monitor, respond, and analyze all your Google Reviews in one centralized place, saving you hours of manual work each week.',
  },
  {
    icon: TrendingUp,
    title: 'Reputation Growth',
    description:
      'Implement proven strategies that consistently increase your positive reviews and overall rating. Our smart timing system identifies the perfect moment to request reviews, leading to higher response rates and better ratings.',
  },
  {
    icon: MessageSquare,
    title: 'Smart Responses',
    description:
      'Let AI handle the heavy lifting of crafting professional responses to reviews. Our system learns your brand voice and generates personalized, context-aware replies while maintaining a natural, human touch in every interaction.',
  },
  {
    icon: Users,
    title: 'Customer Insights',
    description:
      'Transform customer feedback into actionable business intelligence with our advanced sentiment analysis. Identify patterns in customer experiences and track sentiment trends over time to make data-driven improvements to your service.',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description:
      'Never miss a critical review with our real-time notification system. Customize alert priorities and receive instant notifications across multiple channels, ensuring you can address urgent feedback within minutes.',
  },
  {
    icon: Zap,
    title: 'Quick Setup',
    description:
      'Get up and running in minutes with our streamlined onboarding process. Connect your Google Business Profile with just a few clicks and start managing your reviews immediately, no technical expertise required.',
  },
  {
    icon: BarChart,
    title: 'Performance Metrics',
    description:
      'Gain deep insights into your review performance with comprehensive analytics and reporting. Track key metrics like response times, rating trends, and sentiment scores while comparing your performance against industry benchmarks.',
  },
  {
    icon: Settings,
    title: 'Customizable Workflow',
    description:
      'Tailor the platform to match your unique business needs with flexible customization options. Create custom response templates, set up automated workflows, and configure notification rules to streamline your review management process.',
  },
]
