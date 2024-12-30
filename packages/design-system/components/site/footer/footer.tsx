import { footerSections } from './footer-data'
import { FooterSocial } from './footer-social'
import { FooterLinks } from './footer-links'
import { Logo } from '../header/logo'

export function Footer() {
  return (
    <footer className="relative flex flex-wrap justify-between pt-10 pb-16 bg-background overflow-hidden border-t lg:px-32">
      <div className="basis-full md:basis-auto md:flex-col md:justify-start flex justify-between gap-8">
        <Logo />
        <FooterSocial />
      </div>

      {footerSections.map((section) => (
        <FooterLinks key={section.title} section={section} />
      ))}
    </footer>
  )
}
