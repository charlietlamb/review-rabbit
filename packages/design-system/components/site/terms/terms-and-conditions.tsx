import { TermsSection } from './terms-section'
import { termsData } from './terms-data'
import { Scale, FileText } from 'lucide-react'

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-bold font-heading text-foreground tracking-tight">
              Terms and Conditions
            </h1>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary/10 text-primary rounded-lg p-4 mb-6 inline-flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">
                Google API Services Terms Compliance
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              These terms govern your use of Review Rabbit's services and our
              implementation of Google APIs. They outline our commitments to
              following Google's technical requirements and your rights and
              responsibilities when using our service.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="prose prose-gray dark:prose-invert max-w-none mb-16">
          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">
              Service Usage Agreement
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By using Review Rabbit, you agree to these terms and acknowledge
              our compliance with Google API Services User Data Policy. Our
              service is designed to help you manage Google Business Profile
              reviews while maintaining strict adherence to Google's technical
              requirements and data protection standards.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {termsData.map((section, index) => (
            <TermsSection
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              For questions about these terms or our implementation, please
              contact{' '}
              <a
                href="mailto:charlie@review-rabbit.com"
                className="text-primary hover:underline"
              >
                charlie@review-rabbit.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
