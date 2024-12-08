import { z } from 'zod'
import { clientsChartSchema } from '../clients/client-types'
import { invoicesChartSchema } from '../payments/invoice-types'
import { invoiceWithClientSchema } from '@remio/database/schema/invoices'

export const DashboardData = z.object({
  clientData: clientsChartSchema,
  invoiceData: invoicesChartSchema,
  recentPayments: z.array(invoiceWithClientSchema),
})

export type DashboardData = z.infer<typeof DashboardData>
