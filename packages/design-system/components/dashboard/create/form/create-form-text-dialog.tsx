'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@dubble/design-system/components/ui/dialog'
import { Button } from '@dubble/design-system/components/ui/button'
import { useAtom, useAtomValue } from 'jotai'
import {
  createCaptionPlatformAtom,
  createSelectedCaptionProviderAtom,
  createSelectedProvidersAtom,
  createTextPlatformAtom,
  createCaptionAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { cn } from '@dubble/design-system/lib/utils'
import { useEffect } from 'react'
import { Label } from '@dubble/design-system/components/ui/label'
import { providerDataById, Provider } from '@dubble/design-system/lib/providers'
import { Textarea } from '@dubble/design-system/components/ui/textarea'

export default function CreateFormTextDialog() {
  const [textPlatform, setTextPlatform] = useAtom(createTextPlatformAtom)
  const mainCaption = useAtomValue(createCaptionAtom)
  const selectedProviders = useAtomValue(createSelectedProvidersAtom)
  const [selectedProvider, setSelectedProvider] = useAtom(
    createSelectedCaptionProviderAtom
  )
  const [platformCaptions, setPlatformCaptions] = useAtom(
    createCaptionPlatformAtom
  )

  // Initialize selected provider
  useEffect(() => {
    if (!selectedProvider && selectedProviders.length > 0) {
      setSelectedProvider(selectedProviders[0].id)
    }
  }, [selectedProviders, selectedProvider, setSelectedProvider])

  const handleCaptionChange = (caption: string) => {
    if (!selectedProvider) return

    setPlatformCaptions((prev) => {
      const newMap = new Map(prev)
      if (caption.length > 0) {
        newMap.set(selectedProvider, caption)
      } else {
        newMap.delete(selectedProvider)
      }
      return newMap
    })
  }

  const currentCaption = selectedProvider
    ? platformCaptions.get(selectedProvider) ?? ''
    : ''

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          colors="link"
          className="text-xs text-muted-foreground p-0"
        >
          {!textPlatform ? 'edit per platform' : 'edit once'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit caption per platform</DialogTitle>
        </DialogHeader>
        {selectedProviders.length === 0 ? (
          <p className="text-muted-foreground">
            No providers selected. Select an account first.
          </p>
        ) : (
          <div className="space-y-4">
            {selectedProvider && (
              <div className="space-y-2">
                <Label className="font-heading">
                  Caption for {providerDataById[selectedProvider].name}
                </Label>
                <Textarea
                  value={currentCaption}
                  onChange={(e) => handleCaptionChange(e.target.value)}
                  placeholder={`Enter platform-specific caption for ${providerDataById[selectedProvider].name}. Leave empty to use the main caption: "${mainCaption}"`}
                  className="min-h-[120px]"
                />
              </div>
            )}
            <div className="flex gap-2">
              {selectedProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={cn(
                    'p-2 rounded-md flex-1 items-center flex justify-center transition-colors',
                    provider.id === selectedProvider
                      ? provider.className
                      : 'bg-muted hover:bg-muted/80'
                  )}
                >
                  {provider.icon}
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
