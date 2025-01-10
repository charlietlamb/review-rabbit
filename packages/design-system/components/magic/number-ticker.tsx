'use client'

import NumberFlow from '@number-flow/react'
import { type Format } from '@number-flow/react'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface NumberFlowProps {
  value: number
  format?: Format
  locales?: string | string[]
  prefix?: string
  suffix?: string
  spinTiming?: EffectTiming
  willChange?: boolean
}

function NumberFlowWrapper({
  value,
  format = {},
  locales,
  prefix,
  suffix,
  spinTiming,
  willChange = false,
}: NumberFlowProps) {
  return (
    <NumberFlow
      value={value}
      format={format}
      locales={locales}
      prefix={prefix}
      suffix={suffix}
      spinTiming={spinTiming}
      willChange={willChange}
    />
  )
}

export function NumberTicker({ spinTiming }: { spinTiming: EffectTiming }) {
  const [value, setValue] = useState(9)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      setValue(1)
    }
  }, [isInView])

  return (
    <span ref={ref}>
      <NumberFlowWrapper spinTiming={spinTiming} value={value} />
    </span>
  )
}
