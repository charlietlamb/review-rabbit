import { ProviderData } from '@dubble/design-system/lib/providers'
import { cn } from '@dubble/design-system/lib/utils'
import { cloneElement, isValidElement, ReactElement } from 'react'

export default function ProviderCard({ provider }: { provider: ProviderData }) {
  const iconElement = isValidElement(provider.icon)
    ? cloneElement(provider.icon as ReactElement<{ className?: string }>, {
        className: cn('w-16 h-16 mb-2', provider.icon.props?.className),
      })
    : provider.icon

  return (
    <button
      className={cn(
        'text-lg font-bold font-heading p-2 transition-all duration-300 rounded-lg flex flex-col items-center justify-center md:py-8 cursor-pointer',
        provider.className
      )}
    >
      {iconElement}
      <p className="text-2xl">{provider.name}</p>
    </button>
  )
}
