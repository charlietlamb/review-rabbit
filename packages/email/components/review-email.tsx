import React from 'react'
import { Body, Head, Html, Preview } from '@react-email/components'
import TailwindProvider from './tailwind-provider'
import { EmailHeading, EmailButton, EmailMessage, EmailLayout } from './shared'
import { EmailTaskType } from '@rabbit/trigger/types/email-type'

function ReviewEmail({ email }: { email: EmailTaskType }) {
  return (
    <TailwindProvider>
      <Html>
        <Head />
        <Preview>{email.subject}</Preview>
        <Body className="bg-white font-sans">
          <EmailLayout image={email.business.image || undefined}>
            <EmailHeading>{email.subject}</EmailHeading>
            <EmailMessage>Hello {email.client.name},</EmailMessage>
            <EmailMessage>{email.content}</EmailMessage>
            <EmailButton href={email.business.url}>Leave a Review</EmailButton>
          </EmailLayout>
        </Body>
      </Html>
    </TailwindProvider>
  )
}

export function getReviewEmail(email: EmailTaskType) {
  return <ReviewEmail email={email} />
}
