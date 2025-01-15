import {
  Database,
  Users,
  Share2,
  Shield,
  Cookie,
  UserCheck,
  RefreshCcw,
  Mail,
  Link as LinkIcon,
  Lock,
  Search,
  Star,
  Check,
  FileText,
  Scale,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type PolicySection = {
  icon: LucideIcon
  title: string
  description: string
}

export const policySections: PolicySection[] = [
  {
    icon: Shield,
    title: 'Google API Services User Data Policy Compliance',
    description:
      "Review Rabbit strictly adheres to Google API Services User Data Policy requirements. Our implementation follows all technical specifications and security requirements mandated by Google's API Services policies. We maintain comprehensive security measures and regularly assess our compliance with Google's requirements.",
  },
  {
    icon: Scale,
    title: 'Limited Use Requirements',
    description:
      "Our technical implementation strictly follows Google's API Services User Data Policy and Limited Use requirements. We request only the minimum necessary API scopes required for review management functionality. Data processing is exclusively limited to providing and improving our core review management service, with no secondary uses.",
  },
  {
    icon: Database,
    title: 'Data Collection and Authorization',
    description:
      "We implement Google's OAuth2.0 authentication process for all data access. Our technical scope is precisely limited to: 1) Reading business profile information, 2) Accessing review data, and 3) Managing review responses. We implement secure token management and never store Google credentials.",
  },
  {
    icon: Star,
    title: 'Review Data Processing',
    description:
      "Our review management system is built in strict accordance with Google's Terms of Service and API policies. We implement only authorized operations: 1) Review display, 2) Analytics generation, and 3) Response management. Our technical implementation prevents modification of review content or ratings manipulation.",
  },
  {
    icon: Lock,
    title: 'Security Implementation',
    description:
      "Our infrastructure implements Google's required security measures including: 1) AES-256 encryption for data at rest, 2) TLS 1.3 for data in transit, 3) Multi-factor authentication, and 4) Continuous security monitoring. We maintain security incident reporting protocols as specified by Google.",
  },
  {
    icon: Users,
    title: 'Technical Restrictions',
    description:
      'Our system architecture strictly prevents: 1) Unauthorized data collection, 2) Review content manipulation, 3) Use of data for advertising or marketing, 4) Data resale or transfer, and 5) Any processing beyond review management functionality. These restrictions are enforced at both application and infrastructure levels.',
  },
  {
    icon: FileText,
    title: 'Data Processing Controls',
    description:
      "All data processing follows Google's technical specifications. We maintain detailed audit logs of all data operations as required by Google's API Services User Data Policy. Our data handling procedures comply with GDPR and CCPA requirements while adhering to Google's data protection standards.",
  },
  {
    icon: Check,
    title: 'API Policy Implementation',
    description:
      "Our technical implementation follows all Google API policy requirements. We maintain comprehensive documentation of our compliance measures and regularly review our systems against Google's latest API policies and terms of service to ensure continued adherence.",
  },
  {
    icon: UserCheck,
    title: 'User Data Controls',
    description:
      "Users have programmatic control over their data access permissions through both Google's security settings and our dashboard. We implement Google's required data portability features, allowing users to export their data. All data deletion requests are handled according to Google's technical specifications.",
  },
  {
    icon: Mail,
    title: 'Technical Support',
    description:
      'For technical questions about our Google API implementation or data handling procedures, contact our engineering team at engineering@review-rabbit.com. We maintain detailed documentation of our technical compliance measures. For urgent technical matters, contact our Technical Compliance Lead at compliance@review-rabbit.com.',
  },
]
