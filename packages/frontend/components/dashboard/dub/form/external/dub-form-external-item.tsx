import SocialButton from '@/components/misc/social-button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

export default function DubFormExternalItem({
  className,
  content,
  children,
}: {
  className?: string
  content: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <SocialButton className={className}>{children}</SocialButton>
      </DialogTrigger>
      {content}
    </Dialog>
  )
}
