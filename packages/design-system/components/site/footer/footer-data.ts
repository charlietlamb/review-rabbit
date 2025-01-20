import { env } from '@rabbit/env'

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
    title: 'Company',
    links: [
      { label: 'Pricing', href: '/pricing' },
      {
        label: 'Contact',
        href: `mailto:help@${env.NEXT_PUBLIC_DOMAIN}`,
      },
    ],
  },
  {
    title: 'Policy',
    links: [
      { label: 'Privacy Policy', href: '/policy' },
      { label: 'Terms and Conditions', href: '/terms' },
    ],
  },
]
