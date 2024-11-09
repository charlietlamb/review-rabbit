import {
  Frame,
  Gauge,
  Download,
  Globe,
  Sparkles,
  LayoutDashboard,
  Palette,
  CodeXml,
} from 'lucide-react'

export const featuresData = [
  {
    icon: Frame,
    title: 'Visual Builder',
    description: 'Edit HTML, Tailwind & React components visually.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-l lg:border-b',
  },
  {
    icon: Gauge,
    title: 'Ease of use',
    description: 'No new mental models to learn. It feels like magic.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Download,
    title: 'Code Export',
    description: 'Export your website to a Next.js & Tailwind app.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Globe,
    title: 'No lock-in',
    description: 'Customize without limitations and host anywhere.',
    position: 'top' as const,
    className: 'lg:border-r lg:border-b',
  },
  {
    icon: Sparkles,
    title: 'Modern tech stack',
    description: 'Works with Next.js, Tailwind and Shadcn UI.',
    position: 'bottom' as const,
    className: 'lg:border-r lg:border-l',
  },
  {
    icon: LayoutDashboard,
    title: 'Pre-made templates',
    description: 'Get started quickly with ready templates and sections.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
  {
    icon: Palette,
    title: 'AI Theme Generation',
    description: 'Generate beautiful themes and color palettes with AI.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
  {
    icon: CodeXml,
    title: 'Built for developers',
    description: 'remio is built by developers for developers.',
    position: 'bottom' as const,
    className: 'lg:border-r',
  },
] as const
