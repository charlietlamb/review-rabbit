import { getEnv } from '@rabbit/env'
import Image from 'next/image'

export default function HeroAvatars() {
  return (
    <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5">
      <div className="flex -space-x-1.5">
        <Image
          className="rounded-full ring-1 ring-background"
          src={`${getEnv().NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/rabbit/avatar1.jpg`}
          width={20}
          height={20}
          alt="Avatar 01"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src={`${getEnv().NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/rabbit/avatar2.jpg`}
          width={20}
          height={20}
          alt="Avatar 02"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src={`${getEnv().NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/rabbit/avatar3.jpg`}
          width={20}
          height={20}
          alt="Avatar 03"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src={`${getEnv().NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/rabbit/avatar4.jpg`}
          width={20}
          height={20}
          alt="Avatar 04"
        />
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Trusted by <strong className="font-medium text-foreground">100+</strong>{' '}
        businesses.
      </p>
    </div>
  )
}
