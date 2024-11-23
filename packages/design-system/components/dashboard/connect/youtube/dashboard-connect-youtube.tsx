import { GoogleOAuthProvider } from '@react-oauth/google'
import DashboardConnectYoutubeButton from './dashboard-connect-youtube-button'

export default function DashboardConnectYoutube() {
  return (
    <GoogleOAuthProvider clientId="1063999285216-pkh72jia8l352ivn7q9ojpqrp1dvuv9m.apps.googleusercontent.com">
      <DashboardConnectYoutubeButton />
    </GoogleOAuthProvider>
  )
}
