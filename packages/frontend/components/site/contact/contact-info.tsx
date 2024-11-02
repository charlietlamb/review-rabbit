import { AtSign } from 'lucide-react'

export function ContactInfo() {
  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold text-primary mb-4">
        Contact Information
      </h2>
      <div className="flex items-center space-x-4 mb-4">
        <AtSign className="h-6 w-6" />
        <div>
          <h3 className="font-heading text-lg font-semibold text-primary">
            Email
          </h3>
          <p className="text-muted-foreground">Our team is here to help.</p>
          <p className="font-semibold text-primary">support@example.com</p>
        </div>
      </div>
    </div>
  )
}
