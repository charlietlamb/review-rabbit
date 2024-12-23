import { InstagramLogoIcon } from '@radix-ui/react-icons'
import { RiFacebookBoxFill } from '@remixicon/react'
import Link from 'next/link'

export function FooterSocial() {
  return (
    <div className="flex items-center gap-4">
      <Link href="#">
        <InstagramLogoIcon className="size-8" />
      </Link>
      <Link href="#">
        <RiFacebookBoxFill className="size-8" />
      </Link>
    </div>
  )
}
