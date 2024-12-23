import { Body, Head, Html, Preview } from '@react-email/components'
import TailwindProvider from './tailwind-provider'
import { EmailLayout, EmailHeading, EmailMessage, EmailButton } from './shared'

function ResetPassword({ name, url }: { name: string; url: string }) {
  return (
    <TailwindProvider>
      <Html>
        <Head />
        <Preview>Reset your password</Preview>
        <Body className="bg-white font-sans">
          <EmailLayout>
            <EmailHeading>Password Reset Request</EmailHeading>
            <EmailMessage>Hello {name},</EmailMessage>
            <EmailMessage>
              We received a request to reset the password for your account. If
              you didn't make this request, you can safely ignore this email.
            </EmailMessage>
            <EmailMessage>
              To reset your password, click the button below:
            </EmailMessage>
            <EmailButton href={url}>Reset Your Password</EmailButton>
            <EmailMessage>
              This password reset link will expire in 24 hours. If you need to
              reset your password after that, please request a new reset link.
            </EmailMessage>
            <EmailMessage>
              If you didn't request a password reset, please contact our support
              team immediately.
            </EmailMessage>
          </EmailLayout>
        </Body>
      </Html>
    </TailwindProvider>
  )
}

export function getResetPasswordEmail(name: string, url: string) {
  return <ResetPassword name={name} url={url} />
}
