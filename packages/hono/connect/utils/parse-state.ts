import { z } from 'zod'

import { findVerificationValue } from '@dubble/hono/connect/utils/find-verification-value'
import { deleteVerificationValue } from '@dubble/hono/connect/utils/delete-verification-value'

export async function parseState(state: string) {
  const verificationValue = await findVerificationValue(state)
  if (!verificationValue) {
    return null
  }
  const parsedData = z
    .object({
      callbackURL: z.string(),
      codeVerifier: z.string(),
      errorURL: z.string().optional(),
      expiresAt: z.number(),
      link: z
        .object({
          email: z.string(),
          userId: z.string(),
        })
        .optional(),
    })
    .parse(JSON.parse(verificationValue))
  if (parsedData.expiresAt < Date.now()) {
    await deleteVerificationValue(state)
    return null
  }
  return parsedData
}
