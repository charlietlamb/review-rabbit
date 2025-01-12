import { Account } from '@rabbit/database'

interface GoogleBusinessAccount {
  name: string
  accountName: string
  type: string
  role: string
  state: {
    status: string
  }
  accountNumber: string
  permissionLevel: string
  organizationInfo?: {
    organizationName: string
    phoneNumber: string
  }
}

export async function listBusinessAccounts(
  account: Account
): Promise<GoogleBusinessAccount[]> {
  if (!account.accessToken) {
    throw new Error('No access token available')
  }

  try {
    const response = await fetch(
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Google Business API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      })
      throw new Error(
        `Failed to fetch business accounts: ${response.statusText} (${
          response.status
        }) ${JSON.stringify(errorData)}`
      )
    }

    const data = await response.json()
    return data.accounts || []
  } catch (error) {
    console.error('Error in listBusinessAccounts:', error)
    throw error
  }
}
