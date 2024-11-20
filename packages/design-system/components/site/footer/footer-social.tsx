type SocialIconProps = {
  href: string
  children: React.ReactNode
}

function SocialIcon({ href, children }: SocialIconProps) {
  return (
    <a href={href} className="text-muted-foreground hover:text-foreground">
      {children}
    </a>
  )
}

export function FooterSocial() {
  return (
    <div className="flex items-center gap-5">
      <SocialIcon href="#">
        <svg viewBox="0 0 438.549 438.549" className="size-5">
          {/* GitHub icon path */}
        </svg>
      </SocialIcon>
      <SocialIcon href="#">
        <svg viewBox="0 0 248 204" className="size-5">
          {/* Twitter icon path */}
        </svg>
      </SocialIcon>
      <SocialIcon href="#">
        <svg viewBox="0 0 28.57 20" className="size-5">
          {/* YouTube icon path */}
        </svg>
      </SocialIcon>
    </div>
  )
}
