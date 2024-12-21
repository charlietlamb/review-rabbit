import { pdf } from '@react-pdf/renderer'
import { PdfTemplate } from '@remio/pdf/pdf-template'
import { Template, LineItem } from '@remio/pdf/types'
import { InvoiceWithClient } from '@remio/database/schema'
import { User } from '@remio/database/schema'

export default async function getPdf(invoice: InvoiceWithClient, user: User) {
  if (!invoice.client || !user) {
    throw new Error('Missing required data')
  }

  const template: Template = {
    invoice_no_label: 'Invoice No.',
    issue_date_label: 'Issue Date',
    due_date_label: 'Due Date',
    description_label: 'Description',
    quantity_label: 'Quantity',
    price_label: 'Price',
    total_label: 'Total',
    from_label: 'From',
    customer_label: 'Bill To',
    date_format: 'MM/dd/yyyy',
    payment_label: 'Payment Details',
    note_label: 'Notes',
    tax_label: 'Tax',
    vat_label: 'VAT',
  }

  const lineItems: LineItem[] = [
    {
      name: `Mediation with`,
      quantity: 1,
      price: Number(invoice.amount),
    },
  ]

  const clientDetails = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: invoice.client.name },
          { type: 'text', text: '\n' },
          { type: 'text', text: invoice.client.email || '' },
          { type: 'text', text: '\n' },
          { type: 'text', text: invoice.client.phoneNumber || '' },
        ],
      },
    ],
  }

  const userDetails = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: user.name },
          { type: 'text', text: '\n' },
          { type: 'text', text: user.email },
        ],
      },
    ],
  }

  const pdfComponent = await PdfTemplate({
    invoice_number: invoice.id,
    issue_date: invoice.createdAt.toISOString(),
    due_date: invoice.dueDate.toISOString(),
    template,
    line_items: lineItems,
    customer_details: clientDetails,
    from_details: userDetails,
    payment_details: null,
    note_details: null,
    vat: 0,
    tax: 0,
    amount: Number(invoice.amount),
    token: invoice.id,
    size: 'letter',
    currency: 'GBP',
  })
  return pdf(pdfComponent)
}
