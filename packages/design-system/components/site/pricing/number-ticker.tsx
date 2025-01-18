'use client'

import { motion } from 'framer-motion'

interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

export function NumberTicker({
  value,
  prefix = '',
  suffix = '',
  className = '',
}: NumberTickerProps) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {prefix}
      <motion.span
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {value.toLocaleString()}
      </motion.span>
      {suffix}
    </motion.span>
  )
}
