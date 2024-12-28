import { connectStripe } from '@burse/design-system/actions/stripe/connect'

export const handleConnect = async () => {
  try {
    const result = await connectStripe()

    if (result.redirectUrl) {
      window.location.href = result.redirectUrl
    } else if (result.error) {
      console.error('Failed to get OAuth URL:', result.error)
    }
  } catch (error) {
    console.error('Error connecting to Stripe:', error)
  }
}
