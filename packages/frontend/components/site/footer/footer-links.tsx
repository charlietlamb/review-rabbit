import Link from 'next/link'
import { FooterSection } from './footer-data'

export function FooterLinks({ section }: { section: FooterSection }) {
  return (
    <div className="basis-1/2 md:mt-0 md:basis-auto flex flex-col gap-5 mt-10">
      <h3 className="font-semibold">{section.title}</h3>
      {section.links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
