import { Body, Head, Html, Preview } from '@react-email/components'
import TailwindProvider from './tailwind-provider'
import { EmailHeading, EmailButton, EmailMessage, EmailLayout } from './shared'

function ReviewEmail({ name, url }: { name: string; url: string }) {
  return (
    <TailwindProvider>
      <Html>
        <Head />
        <Preview>Review your email</Preview>
        <Body className="bg-white font-sans">
          <EmailLayout>
            <EmailHeading>Review Your Email</EmailHeading>
            <EmailMessage>Hello {name},</EmailMessage>
            <EmailMessage>
              Thank you for signing up! To complete your registration and start
              using our service, please verify your email address by clicking
              the button below:
            </EmailMessage>
            <EmailButton href={url}>Leave a Review</EmailButton>
            <EmailMessage>
              If you didn't create an account, you can safely ignore this email.
            </EmailMessage>
          </EmailLayout>
        </Body>
      </Html>
    </TailwindProvider>
  )
}

export function getReviewEmail(name: string, url: string) {
  return <ReviewEmail name={name} url={url} />
}
