import { headers } from 'next/headers'

export async function headersWithCookies() {
  return {
    headers: {
      cookie: (await headers()).get('cookie') ?? '',
    },
  }
}
