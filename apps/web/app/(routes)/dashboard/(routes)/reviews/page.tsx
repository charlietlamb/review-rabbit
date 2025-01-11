import Reviews from '@rabbit/design-system/components/dashboard/reviews/reviews'
import { getGoogleAccount } from '@rabbit/design-system/actions/auth/user/get-google-account'

export default async function page() {
  const account = await getGoogleAccount()
  if (!account) {
    return <div>No google account found</div>
  }
  console.log(account)
  return <Reviews account={account} />
}
