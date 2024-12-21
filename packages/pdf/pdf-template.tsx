import { env } from '@remio/env/'
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer'
import type { TemplateProps } from '@remio/pdf/types'
import { EditorContent } from '@remio/pdf/components/editor-content'
import { LineItems } from '@remio/pdf/components/line-items'
import { Meta } from '@remio/pdf/components/meta'
import { Note } from '@remio/pdf/components/note'
import { PaymentDetails } from '@remio/pdf/components/payment-details'
import { QRCode } from '@remio/pdf/components/qr-code'
import { Summary } from '@remio/pdf/components/summary'
import QRCodeUtil from 'qrcode'

Font.register({
  family: 'GeistMono',
  fonts: [
    {
      src: `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/fonts/GeistMono-Regular.ttf`,
      fontWeight: 400,
    },
    {
      src: `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/fonts/GeistMono-Medium.ttf`,
      fontWeight: 500,
    },
  ],
})

Font.register({
  family: 'GeistSans',
  fonts: [
    {
      src: `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/fonts/Geist-Regular.ttf`,
      fontWeight: 400,
    },
    {
      src: `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/fonts/Geist-Medium.ttf`,
      fontWeight: 500,
    },
  ],
})

export async function PdfTemplate({
  invoice_number,
  issue_date,
  due_date,
  template,
  line_items,
  customer_details,
  from_details,
  payment_details,
  note_details,
  currency,
  vat,
  tax,
  amount,
  size = 'a4',
  token,
}: TemplateProps) {
  const qrCode = await QRCodeUtil.toDataURL(
    `https://app.midday.ai/i/${token}`,
    {
      width: 40 * 3,
      height: 40 * 3,
      margin: 0,
    }
  )

  return (
    <Document>
      <Page
        size={size.toUpperCase() as 'LETTER' | 'A4'}
        style={{
          padding: 20,
          backgroundColor: '#fff',
          fontFamily: 'GeistMono',
          color: '#000',
        }}
      >
        <View style={{ marginBottom: 20 }}>
          {template?.logo_url && (
            <Image
              src={template.logo_url}
              style={{
                width: 78,
                height: 78,
              }}
            />
          )}
        </View>

        <Meta
          invoiceNoLabel={template.invoice_no_label}
          issueDateLabel={template.issue_date_label}
          dueDateLabel={template.due_date_label}
          invoiceNo={invoice_number}
          issueDate={issue_date}
          dueDate={due_date}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 9, fontWeight: 500 }}>
                {template.from_label}
              </Text>
              <EditorContent content={from_details} />
            </View>
          </View>

          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 9, fontWeight: 500 }}>
                {template.customer_label}
              </Text>
              <EditorContent content={customer_details} />
            </View>
          </View>
        </View>

        <LineItems
          lineItems={line_items}
          currency={currency}
          descriptionLabel={template.description_label}
          quantityLabel={template.quantity_label}
          priceLabel={template.price_label}
          totalLabel={template.total_label}
        />

        <Summary
          amount={amount}
          tax={tax}
          vat={vat}
          currency={currency}
          totalLabel={template.total_label}
          taxLabel={template.tax_label}
          vatLabel={template.vat_label}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <PaymentDetails
                content={payment_details}
                paymentLabel={template.payment_label}
              />

              <QRCode data={qrCode} />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Note content={note_details} noteLabel={template.note_label} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
