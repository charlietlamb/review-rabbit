import { clientSchema } from '@remio/database/schema/clients'
import { emailSchema } from '@remio/database/schema/email'
import { z } from 'zod'
import { invoiceValidationSchema } from '../invoices/invoice-schema'

export const mediationDataSchema = z.object({
  data: z.array(
    z.object({
      clientId: z.string(),
      invoice: invoiceValidationSchema,
    })
  ),
  date: z.date(),
  duration: z.number(),
})

export type MediationData = z.infer<typeof mediationDataSchema>

export const mediationsRequestSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  startDate: z.date(),
  endDate: z.date(),
})

export type MediationsRequest = z.infer<typeof mediationsRequestSchema>

export const mediationRequestSchema = z.object({
  id: z.string(),
})

export type MediationRequest = z.infer<typeof mediationRequestSchema>

export const mediationDataFormSchema = z.object({
  invoice: invoiceValidationSchema.nullable(),
  email: emailSchema.nullable(),
})

export type MediationDataForm = z.infer<typeof mediationDataFormSchema>

export const mediationClientDataFormSchema = z.object({
  client: clientSchema,
  data: mediationDataFormSchema,
})

export type MediationClientDataForm = z.infer<
  typeof mediationClientDataFormSchema
>
