import { PolicySection } from './policy-section'
import { policySections } from './policy-data'

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold font-heading">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            This Privacy Policy describes how we collect, use, and handle your
            personal information when you use our services.
          </p>
        </div>
        <div className="space-y-12">
          {policySections.map((section) => (
            <PolicySection
              key={section.title}
              icon={section.icon}
              title={section.title}
              description={section.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
