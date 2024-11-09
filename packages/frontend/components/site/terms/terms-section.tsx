type TermsSectionProps = {
  title: string
  content: string
}

export function TermsSection({ title, content }: TermsSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 font-heading">{title}</h2>
      <p className="text-muted-foreground">{content}</p>
    </div>
  )
}
