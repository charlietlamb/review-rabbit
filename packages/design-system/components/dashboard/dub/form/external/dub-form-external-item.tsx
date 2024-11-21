import SocialButton from '@dubble/design-system/components/misc/social-button'
import {
  Dialog,
  DialogTrigger,
} from '@dubble/design-system/components/ui/dialog'
import ExternalForm from './external-form'
import { useState } from 'react'
import { externalData, ExternalPlatformData } from './external'

export default function DubFormExternalItem({
  platform,
}: {
  platform: ExternalPlatformData
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <SocialButton platform={platform} onClick={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>
        <ExternalForm platform={platform} setOpen={setOpen}>
          {platform.name}
        </ExternalForm>
      </Dialog>
    </>
  )
}
