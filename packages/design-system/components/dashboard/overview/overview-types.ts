import { z } from 'zod'
import { clientsChartSchema } from '../clients/client-types'
import { invoicesChartSchema } from '../invoices/invoice-types'

export const DashboardData = z.object({
  clientData: clientsChartSchema,
  invoiceData: invoicesChartSchema,
})

export type DashboardData = z.infer<typeof DashboardData>
