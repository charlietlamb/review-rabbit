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
  createSelectedCaptionProviderAtom,
  createSelectedProvidersAtom,
  createTextPlatformAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { cn } from '@dubble/design-system/lib/utils'
import { useEffect } from 'react'
import { Label } from '@dubble/design-system/components/ui/label'
import { providerDataById, Provider } from '@dubble/design-system/lib/providers'

export default function CreateFormTextDialog() {
  const [textPlatform, setTextPlatform] = useAtom(createTextPlatformAtom)
  const createSelectedProviders = useAtomValue(createSelectedProvidersAtom)
  const [selectedCaptionProvider, setSelectedCaptionProvider] = useAtom(
    createSelectedCaptionProviderAtom
  )

  useEffect(() => {
    if (
      selectedCaptionProvider === null &&
      createSelectedProviders.length > 0
    ) {
      setSelectedCaptionProvider(createSelectedProviders[0].id)
    }
  }, [createSelectedProviders, selectedCaptionProvider])

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit caption per caption</DialogTitle>
        </DialogHeader>
        {createSelectedProviders.length === 0 ? (
          <p>No providers selected. Select an account first.</p>
        ) : (
          <div>
            <Label>
              Caption for{' '}
              {providerDataById[selectedCaptionProvider as Provider]?.name}
            </Label>
            <div className="flex gap-2">
              {createSelectedProviders.map((provider) => (
                <div
                  key={provider.id}
                  className={cn(
                    'p-2 rounded-md w-full items-center flex justify-center',
                    provider.className
                  )}
                >
                  {provider.icon}
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
