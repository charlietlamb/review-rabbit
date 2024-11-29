import { ProviderData } from '@dubble/design-system/lib/providers'
import { cn } from '@dubble/design-system/lib/utils'
import { useRouter } from 'next/navigation'
import { cloneElement, isValidElement, ReactElement } from 'react'

export default function ProviderCard({ provider }: { provider: ProviderData }) {
  const router = useRouter()
  const iconElement = isValidElement(provider.icon)
    ? cloneElement(provider.icon as ReactElement<{ className?: string }>, {
        className: cn('w-12 h-12 mb-2', provider.icon.props?.className),
      })
    : provider.icon

  return (
    <button
      className={cn(
        'text-lg font-bold font-heading p-2 transition-all duration-300 rounded-lg flex flex-col items-center justify-center md:py-8 cursor-pointer text-white',
        provider.className
      )}
      onClick={() =>
        router.push(`/dashboard/connect/${provider.name.toLowerCase()}`)
      }
    >
      {iconElement}
      <p className="text-2xl">{provider.name}</p>
    </button>
  )
}
