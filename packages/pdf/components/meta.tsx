import { Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'

interface MetaProps {
  invoiceNo: string
  issueDate: string
  dueDate: string
  invoiceNoLabel: string
  issueDateLabel: string
  dueDateLabel: string
  dateFormat?: string
}

export function Meta({
  invoiceNo,
  issueDate,
  dueDate,
  invoiceNoLabel,
  issueDateLabel,
  dueDateLabel,
  dateFormat = 'MM/dd/yyyy',
}: MetaProps) {
  return (
    <View style={{ marginTop: 20, marginBottom: 40 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: 500, color: '#4B5563' }}>
              {invoiceNoLabel}
            </Text>
            <Text style={{ fontSize: 9, maxWidth: 300 }}>{invoiceNo}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: 500, color: '#4B5563' }}>
              {issueDateLabel}
            </Text>
            <Text style={{ fontSize: 9 }}>{format(issueDate, dateFormat)}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: 500, color: '#4B5563' }}>
              {dueDateLabel}
            </Text>
            <Text style={{ fontSize: 9 }}>{format(dueDate, dateFormat)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
