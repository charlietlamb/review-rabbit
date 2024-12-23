import { env } from '@remio/env'
import Image from 'next/image'

export default function HeroPitch() {
  return (
    <Image
      alt="SaaS Dashboard"
      src={`${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/remio/demo.webp`}
      width={1000}
      height={698}
      priority
      className="rounded-xl border border-border shadow-lg md:w-[80%] w-full"
    />
  )
}
