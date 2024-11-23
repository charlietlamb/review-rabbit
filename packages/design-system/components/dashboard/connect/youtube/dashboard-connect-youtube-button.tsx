import { useGoogleLogin } from '@react-oauth/google'
import { externalDataByName } from '@dubble/design-system/components/dashboard/dub/form/external/external'
import SocialButton from '@dubble/design-system/components/misc/social-button'
import { authClient } from '@dubble/design-system/lib/authClient'

export default function DashboardConnectYoutubeButton() {
  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  // })
  async function login() {
    await authClient.linkSocial({
      provider: 'google',
      callbackURL: '/dashboard/connect',
    })
  }
  const platform = externalDataByName['YouTube']

  return (
    <SocialButton platform={platform} onClick={() => login()}>
      Connect YouTube {platform.icon}
    </SocialButton>
  )
}
