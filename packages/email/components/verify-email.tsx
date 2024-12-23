import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import TailwindProvider from './tailwind-provider'
import {
  EmailHeader,
  EmailHeading,
  EmailButton,
  EmailFooter,
  EmailMessage,
  EmailLayout,
} from './shared'

function VerifyEmail({ name, url }: { name: string; url: string }) {
  return (
    <TailwindProvider>
      <Html>
        <Head />
        <Preview>Verify your email address</Preview>
        <Body className="bg-white font-sans">
          <EmailLayout>
            <EmailHeading>Verify Your Email Address</EmailHeading>
            <EmailMessage>Hello {name},</EmailMessage>
            <EmailMessage>
              Thank you for signing up! To complete your registration and start
              using our service, please verify your email address by clicking
              the button below:
            </EmailMessage>
            <EmailButton href={url}>Verify Email Address</EmailButton>
            <EmailMessage>
              If you didn't create an account, you can safely ignore this email.
            </EmailMessage>
          </EmailLayout>
        </Body>
      </Html>
    </TailwindProvider>
  )
}

export function getVerifyEmail(name: string, url: string) {
  return <VerifyEmail name={name} url={url} />
}
