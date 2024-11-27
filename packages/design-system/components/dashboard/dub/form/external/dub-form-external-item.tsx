import SocialButton from '@dubble/design-system/components/misc/social-button'
import {
  Dialog,
  DialogTrigger,
} from '@dubble/design-system/components/ui/dialog'
import ExternalForm from './external-form'
import { useState } from 'react'
import { providerData, ProviderData } from '../../../../../lib/providers'

export default function DubFormExternalItem({
  platform,
}: {
  platform: ProviderData
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <SocialButton platform={platform} onClick={() => setOpen(true)}>
        {platform.icon}
        <p className="hidden md:inline-block">{platform.name}</p>
      </SocialButton>
      <Dialog open={open} onOpenChange={setOpen}>
        <ExternalForm platform={platform} setOpen={setOpen}>
          {platform.name}
        </ExternalForm>
      </Dialog>
    </>
  )
}
