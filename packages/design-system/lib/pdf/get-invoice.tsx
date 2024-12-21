import { InvoiceWithClient, User } from '@remio/database/schema'
import getPdf from '@remio/pdf'

export default async function getInvoice(
  invoice: InvoiceWithClient,
  user: User
) {
  try {
    const pdfComponent = await getPdf(invoice, user)
    const blob = await pdfComponent.toBlob()

    const objectUrl = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = objectUrl
    a.download = `invoice-${invoice.id}.pdf`
    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    URL.revokeObjectURL(objectUrl)
  } catch (error) {
    console.error('Failed to download invoice:', error)
    throw error
  }
}
