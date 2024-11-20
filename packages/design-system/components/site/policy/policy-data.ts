import {
  Database,
  Users,
  Share2,
  Shield,
  Cookie,
  UserCheck,
  Baby,
  RefreshCcw,
  Mail,
  Link as LinkIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type PolicySection = {
  icon: LucideIcon
  title: string
  description: string
}

export const policySections: PolicySection[] = [
  {
    icon: Database,
    title: 'Data Collection',
    description:
      'We collect personal information that you provide directly to us when using our services.',
  },
  {
    icon: Users,
    title: 'Use of Information',
    description:
      'We use the information we collect to provide, maintain, and improve our services.',
  },
  {
    icon: Share2,
    title: 'Data Sharing',
    description:
      'We do not sell your personal information to third parties. We may share data with service providers who assist us in our operations.',
  },
  {
    icon: Shield,
    title: 'Data Security',
    description:
      'We implement appropriate technical and organizational measures to protect the security of your personal information.',
  },
  {
    icon: Cookie,
    title: 'Cookies',
    description:
      'We use cookies and similar tracking technologies to track activity on our service and hold certain information.',
  },
  {
    icon: UserCheck,
    title: 'User Rights',
    description:
      'You have the right to access, correct, or delete your personal information that we hold.',
  },
  {
    icon: Baby,
    title: "Children's Privacy",
    description:
      'Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.',
  },
  {
    icon: RefreshCcw,
    title: 'Changes to Policy',
    description:
      'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.',
  },
  {
    icon: LinkIcon,
    title: 'Third-Party Links',
    description:
      'Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.',
  },
  {
    icon: Mail,
    title: 'Contact Us',
    description:
      'If you have any questions about this Privacy Policy, please contact us using the information provided on our website.',
  },
]
