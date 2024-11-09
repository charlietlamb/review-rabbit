import { footerSections } from './footer-data'
import { FooterLogo } from './footer-logo'
import { FooterSocial } from './footer-social'
import { FooterLinks } from './footer-links'

export function Footer() {
  return (
    <footer className="container flex flex-wrap justify-between pt-10 pb-16 mt-10">
      <div className="basis-full md:basis-auto md:flex-col md:justify-start flex justify-between gap-8">
        <FooterLogo />
        <FooterSocial />
      </div>

      {footerSections.map((section) => (
        <FooterLinks key={section.title} section={section} />
      ))}
    </footer>
  )
}
