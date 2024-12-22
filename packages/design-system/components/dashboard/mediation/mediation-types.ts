import { clientSchema } from '@remio/database/schema/clients'
import { z } from 'zod'
import { invoiceValidationSchema } from '../invoices/invoice-schema'

export const mediationDataSchema = z.object({
  data: z.array(
    z.object({
      clientId: z.string(),
      invoice: invoiceValidationSchema.nullable(),
      email: z.boolean(),
    })
  ),
  title: z.string(),
  notes: z.string().nullable(),
  color: z.string().min(1),
  date: z.coerce.date(),
  duration: z.number(),
})

export type MediationData = z.infer<typeof mediationDataSchema>

export const mediationsRequestSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  clientId: z.string().optional(),
})

export type MediationsRequest = z.infer<typeof mediationsRequestSchema>

export const mediationRequestSchema = z.object({
  id: z.string(),
})

export type MediationRequest = z.infer<typeof mediationRequestSchema>

export const mediationRequestWithPageSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  search: z.string().optional(),
})

export type MediationRequestWithPage = z.infer<
  typeof mediationRequestWithPageSchema
>

export const mediationDataFormSchema = z.object({
  invoice: invoiceValidationSchema.nullable(),
  email: z.boolean(),
})

export type MediationDataForm = z.infer<typeof mediationDataFormSchema>

export const mediationClientDataFormSchema = z.object({
  client: clientSchema,
  data: mediationDataFormSchema,
})

export type MediationClientDataForm = z.infer<
  typeof mediationClientDataFormSchema
>
