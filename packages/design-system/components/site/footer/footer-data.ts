export type FooterLink = {
  label: string
  href: string
}

export type FooterSection = {
  title: string
  links: FooterLink[]
}

export const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'Download', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Customers', href: '#' },
      { label: 'Brand', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Startup Program', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'DPA', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of service', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'API', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Docs', href: '#' },
    ],
  },
]
