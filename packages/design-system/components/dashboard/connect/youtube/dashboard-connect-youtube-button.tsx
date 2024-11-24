import { socialPlatformsByName } from '@dubble/design-system/lib/socials'
import SocialButton from '@dubble/design-system/components/misc/social-button'
import { useRouter } from 'next/navigation'
import connectGoogle from '@dubble/design-system/actions/connect/connect-google'

export default function DashboardConnectYoutubeButton() {
  const router = useRouter()
  async function login() {
    connectGoogle(router.push)
  }
  const platform = socialPlatformsByName['YouTube']

  return (
    <SocialButton platform={platform} onClick={() => login()}>
      Connect YouTube {platform.icon}
    </SocialButton>
  )
}
