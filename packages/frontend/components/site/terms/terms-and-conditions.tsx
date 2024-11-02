import { TermsSection } from './terms-section'
import { termsData } from './terms-data'

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold font-heading">
          Terms and Conditions
        </h1>
        <p className="text-muted-foreground">
          Please read these terms and conditions carefully before using our
          website.
        </p>
        <div className="space-y-6">
          {termsData.map((section, index) => (
            <TermsSection
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
