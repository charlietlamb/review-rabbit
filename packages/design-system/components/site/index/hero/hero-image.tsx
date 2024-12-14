'use client'

import { motion } from 'framer-motion'

export default function HeroImage() {
  return (
    <div className="absolute left-0 right-0 -top-[300px] -bottom-20 overflow-hidden pointer-events-none">
      <motion.div
        className="-z-20 relative w-full h-full"
        style={{
          background: `radial-gradient(circle, hsla(var(--primary) / 0.2) 0%, hsla(var(--background) / 0.8) 50%, hsl(var(--background)) 100%)`,
        }}
        animate={{
          scale: [1, 1.015, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
