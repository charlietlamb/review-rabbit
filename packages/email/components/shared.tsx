import {
  Button,
  Container,
  Heading,
  Hr,
  Img,
  Section,
  Text,
} from '@react-email/components'
import { EnvType } from '@rabbit/env'

export function EmailHeader({ image, env }: { image?: string; env: EnvType }) {
  return (
    <Img
      src={
        image ||
        `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/review-rabbit/logo.svg`
      }
      width="48"
      height="48"
      alt="Company Logo"
      className="mx-auto mb-4"
    />
  )
}

export function EmailHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading className="text-2xl font-bold text-center text-gray-800 mb-4">
      {children}
    </Heading>
  )
}

export function EmailButton({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Section className="text-center mb-6">
      <Button
        className="bg-primary text-white font-bold rounded-md px-4 py-2"
        href={href}
      >
        {children}
      </Button>
    </Section>
  )
}

export function EmailFooter() {
  return (
    <>
      <Hr className="border-gray-300 my-4" />
      <Text className="text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} review-rabbit. All rights reserved.
      </Text>
    </>
  )
}

export function EmailLayout({
  children,
  image,
  env,
}: {
  children: React.ReactNode
  image?: string
  env: EnvType
}) {
  return (
    <Container className="mx-auto py-5 px-5 max-w-xl">
      <EmailHeader image={image} env={env} />
      {children}
      <EmailFooter />
    </Container>
  )
}

export function EmailMessage({ children }: { children: React.ReactNode }) {
  return <Text className="text-gray-700 mb-4">{children}</Text>
}
