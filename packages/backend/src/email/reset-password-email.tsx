import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import TailwindProvider from './tailwind-provider'
import { User } from '../db/schema/users'

function ResetPassword({ user, token }: { user: User; token: string }) {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
  return (
    <TailwindProvider>
      <Html>
        <Head />
        <Preview>Reset your password</Preview>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 px-5 max-w-xl">
            <Img
              src="https://placeholder.svg?height=48&width=48"
              width="48"
              height="48"
              alt="Company Logo"
              className="mx-auto mb-4"
            />
            <Heading className="text-2xl font-bold text-center text-gray-800 mb-4">
              Password Reset Request
            </Heading>
            <Text className="text-gray-700 mb-4">Hello {user.name},</Text>
            <Text className="text-gray-700 mb-4">
              We received a request to reset the password for your account. If
              you didn't make this request, you can safely ignore this email.
            </Text>
            <Text className="text-gray-700 mb-4">
              To reset your password, click the button below:
            </Text>
            <Section className="text-center mb-6">
              <Button
                className="bg-primary text-white font-bold rounded-md px-8 py-6"
                href={url}
              >
                Reset Your Password
              </Button>
            </Section>
            <Text className="text-gray-700 mb-4">
              This password reset link will expire in 24 hours. If you need to
              reset your password after that, please request a new reset link.
            </Text>
            <Text className="text-gray-700 mb-4">
              If you didn't request a password reset, please contact our support
              team immediately.
            </Text>
            <Hr className="border-gray-300 my-4" />
            <Text className="text-gray-500 text-sm text-center">
              © {new Date().getFullYear()} remio. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Html>
    </TailwindProvider>
  )
}
export default function resetPasswordEmail(user: User, token: string) {
  return <ResetPassword user={user} token={token} />
}
