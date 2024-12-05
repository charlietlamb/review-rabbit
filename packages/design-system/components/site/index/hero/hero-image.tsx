'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { env } from '@remio/env'

export default function HeroImage() {
  return (
    <div className="absolute left-0 right-0 -top-[300px] -bottom-20 -z-20 overflow-hidden">
      <motion.div
        className="relative w-full h-full"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* <Image
          alt="Hero Image"
          src={`${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/hero-remio.webp`}
          layout="fill"
          objectFit="cover"
          priority
        /> */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-50" />
      </motion.div>
      <div className="absolute inset-0 z-10" />
      <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black to-transparent z-20 opacity-50" />
    </div>
  )
}
