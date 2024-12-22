'use client'

import { InvoiceWithClient } from '@remio/database'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@remio/design-system/components/ui/tooltip'
import { cn } from '@remio/design-system/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import getInvoicePaymentLink from '@remio/design-system/lib/dashboard/invoice/get-invoice-payment-link'
import { Button } from '@remio/design-system/components/ui/button'

export default function InvoicePaymentLinkCopy({
  invoice,
}: {
  invoice: InvoiceWithClient
}) {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    try {
      setCopied(true)

      const url = await getInvoicePaymentLink(invoice)
      navigator.clipboard.writeText(url)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="disabled:opacity-100"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
          disabled={copied}
        >
          <div
            className={cn(
              'transition-all',
              copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            )}
          >
            <Check
              className="stroke-emerald-500"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          <div
            className={cn(
              'absolute transition-all',
              copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            )}
          >
            <Copy size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="px-2 py-1 text-xs">
        Click to copy
      </TooltipContent>
    </Tooltip>
  )
}
