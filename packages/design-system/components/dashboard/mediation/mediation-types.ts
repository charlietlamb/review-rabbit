import { invoiceSchema } from '@remio/database/schema/invoices'
import { z } from 'zod'

export const mediationDataSchema = z.object({
  data: z.array(
    z.object({
      clientId: z.string(),
      invoice: invoiceSchema,
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
