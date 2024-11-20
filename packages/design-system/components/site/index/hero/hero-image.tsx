import { CLOUDFRONT_URL } from '@/constants'
import Image from 'next/image'

export default function HeroImage() {
  return (
    <div className="absolute left-0 right-0 -top-[300px] -bottom-20 -z-20">
      <Image
        alt="Hero Image"
        src={`${CLOUDFRONT_URL}/public/hero-image.png`}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 z-10 bg-black/60" />
      <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-background to-transparent  z-20" />
    </div>
  )
}
