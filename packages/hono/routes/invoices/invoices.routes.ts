import { HttpStatusCodes } from '@remio/http'
import { jsonContent } from 'stoker/openapi/helpers'
import { unauthorizedSchema } from '@remio/hono/lib/configure-auth'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import {
  invoiceSchema,
  invoiceWithClientSchema,
} from '@remio/database/schema/invoices'
import { invoiceValidationSchema } from '@remio/design-system/components/dashboard/invoices/invoice-schema'
import { invoicesChartSchema } from '@remio/design-system/components/dashboard/invoices/invoice-types'

const tags = ['Invoices']

export const getInvoices = createRoute({
  path: '/invoices',
  method: 'post',
  summary: 'Get invoices',
  tags,
  request: {
    body: {
      description: 'Pagination parameters',
      content: {
        'application/json': {
          schema: z.object({
            offset: z.number(),
            limit: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(invoiceSchema),
      'Invoices fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch invoices'
    ),
    ...unauthorizedSchema,
  },
})

export type GetInvoicesRoute = typeof getInvoices

export const addInvoice = createRoute({
  path: '/invoices/add',
  method: 'post',
  summary: 'Add an invoice',
  tags,
  request: {
    body: {
      description: 'Invoice data',
      content: {
        'application/json': {
          schema: invoiceValidationSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Invoice added.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to add invoice'
    ),
    ...unauthorizedSchema,
  },
})

export type AddInvoiceRoute = typeof addInvoice

export const updateInvoice = createRoute({
  path: '/invoices/update',
  method: 'post',
  summary: 'Update an invoice',
  tags,
  request: {
    body: {
      description: 'Invoice data',
      content: {
        'application/json': {
          schema: invoiceValidationSchema.extend({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Invoice updated.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to update invoice'
    ),
    ...unauthorizedSchema,
  },
})

export type UpdateInvoiceRoute = typeof updateInvoice

export const deleteInvoice = createRoute({
  path: '/invoices/delete',
  method: 'post',
  summary: 'Delete an invoice',
  tags,
  request: {
    body: {
      description: 'Invoice ID',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.boolean(), 'Invoice deleted.'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to delete invoice'
    ),
    ...unauthorizedSchema,
  },
})

export type DeleteInvoiceRoute = typeof deleteInvoice

export const getInvoicesChart = createRoute({
  path: '/invoices/chart',
  method: 'get',
  summary: 'Get invoices chart',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      invoicesChartSchema,
      'Invoices chart fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch invoices chart'
    ),
    ...unauthorizedSchema,
  },
})

export type GetInvoicesChartRoute = typeof getInvoicesChart

export const getRecentPayments = createRoute({
  path: '/invoices/payments',
  method: 'post',
  summary: 'Get recent payments',
  tags,
  request: {
    body: {
      description: 'Pagination parameters',
      content: {
        'application/json': {
          schema: z.object({
            offset: z.number(),
            limit: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(invoiceWithClientSchema),
      'Recent payments fetched.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        error: z.string(),
      }),
      'Failed to fetch recent payments'
    ),
    ...unauthorizedSchema,
  },
})

export type GetRecentPaymentsRoute = typeof getRecentPayments
