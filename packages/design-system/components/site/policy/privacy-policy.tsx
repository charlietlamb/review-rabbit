import { PolicySection } from './policy-section'
import { policySections } from './policy-data'
import { Shield, Code2 } from 'lucide-react'

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-bold font-heading text-foreground tracking-tight">
              Privacy Policy & Technical Compliance
            </h1>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary/10 text-primary rounded-lg p-4 mb-6 inline-flex items-center space-x-2">
              <Code2 className="h-5 w-5" />
              <span className="text-sm font-medium">
                Implements Google API Services Requirements
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Review Rabbit implements all technical requirements of the Google
              API Services User Data Policy. This privacy policy details our
              technical implementation for handling Google Business Profile data
              and reviews in accordance with Google's specifications.
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
              Technical Implementation Statement
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Review Rabbit's implementation strictly follows Google API
              Services User Data Policy requirements. Our system architecture
              enforces Limited Use requirements through technical controls. All
              data processing is restricted to essential review management
              features, with programmatic safeguards preventing any unauthorized
              use of Google API data.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="grid gap-12">
          {policySections.map((section) => (
            <PolicySection
              key={section.title}
              icon={section.icon}
              title={section.title}
              description={section.description}
            />
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              For technical questions about our implementation, please contact{' '}
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
