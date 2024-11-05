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

function VerifyEmail({ user, url }: { user: User; url: string }) {
  return (
    <TailwindProvider>
      <Html>
        <Head />
        <Preview>Verify your email address</Preview>
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
              Verify Your Email Address
            </Heading>
            <Text className="text-gray-700 mb-4">Hello {user.name},</Text>
            <Text className="text-gray-700 mb-4">
              Thank you for signing up! To complete your registration and start
              using our service, please verify your email address by clicking
              the button below:
            </Text>
            <Section className="text-center mb-6">
              <Button
                className="bg-primary text-white font-bold rounded-md px-8 py-6"
                href={url}
              >
                Verify Email Address
              </Button>
            </Section>
            <Text className="text-gray-700 mb-4">
              If you didn't create an account, you can safely ignore this email.
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

export default function getVerifyEmail(user: User, url: string) {
  return <VerifyEmail user={user} url={url} />
}
