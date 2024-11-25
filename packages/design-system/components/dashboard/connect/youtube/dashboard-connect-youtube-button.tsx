import { socialPlatformsByName } from '@dubble/design-system/lib/socials'
import SocialButton from '@dubble/design-system/components/misc/social-button'
import { useRouter } from 'next/navigation'
import { authClient } from '@dubble/design-system/lib/authClient'
import { env } from '@dubble/env'
import connectGoogle from '@dubble/design-system/actions/connect/connect-google'
export default function DashboardConnectYoutubeButton() {
  const router = useRouter()
  async function login() {
    connectGoogle(router.push)
  }
  // async function login() {
  //   authClient.linkSocial({
  //     provider: 'google',
  //     callbackURL: `${env.NEXT_PUBLIC_API}/connect/google`,
  //   })
  // }
  const platform = socialPlatformsByName['YouTube']

  return (
    <SocialButton platform={platform} onClick={() => login()}>
      Connect YouTube {platform.icon}
    </SocialButton>
  )
}
