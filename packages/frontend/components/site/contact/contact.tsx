import { ContactForm } from './contact-form'

export function Contact() {
  return (
    <div className="bg-background p-8">
      <h1 className="font-heading text-4xl font-bold mb-2 text-center">
        Contact Us
      </h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        We&apos;d love to hear from you! Whether you have questions, feedback,
        or just want to say hello, our team is here to help.
      </p>
      <div className="max-w-4xl mx-auto">
        <ContactForm />
      </div>
    </div>
  )
}
