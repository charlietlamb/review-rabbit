import { cn } from '@/lib/utils'
import React from 'react'

export function getIconWithClassName(
  icon: React.JSX.Element,
  className: string
) {
  return React.cloneElement(icon, {
    className: cn(icon.props.className, className),
  })
}
