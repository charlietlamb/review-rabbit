import { ClientFormData } from '../client-schema'
import { colors } from '@rabbit/design-system/components/form/color/color-picker'

export default function getBulkClientData(
  clientBulkData: string[][],
  nameHeader: string,
  lastNameHeader: string,
  emailHeader: string,
  phoneHeader: string,
  twoNames: boolean
): ClientFormData[] {
  if (clientBulkData.length < 1) return []

  // Get the header row and find indices
  const headers = clientBulkData[0]
  const nameIndex = headers.indexOf(nameHeader)
  const lastNameIndex = headers.indexOf(lastNameHeader)
  const emailIndex = headers.indexOf(emailHeader)
  const phoneIndex = headers.indexOf(phoneHeader)

  // Validate that all required headers were found
  if (
    nameIndex === -1 ||
    emailIndex === -1 ||
    phoneIndex === -1 ||
    (twoNames && lastNameIndex === -1)
  ) {
    throw new Error('Required headers not found in CSV data')
  }

  return clientBulkData.slice(1).map((row) => {
    return {
      name: twoNames
        ? `${row[nameIndex]} ${row[lastNameIndex]}`
        : row[nameIndex],
      email: row[emailIndex],
      phone: row[phoneIndex],
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  })
}
