'use client'

import dub from '@/actions/dub/dub'
import {
  dubLanguagesAtom,
  dubMediaAtom,
  dubTokensAtom,
} from '@/atoms/dashboard/dub/dubAtom'
import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { useAtomValue } from 'jotai'
import DubSummary from './dub-summary'
import { toast } from 'sonner'
import { useState } from 'react'

export default function DubFormSubmit() {
  const dubMedia = useAtomValue(dubMediaAtom)
  const dubLanguages = useAtomValue(dubLanguagesAtom)
  const dubTokens = useAtomValue(dubTokensAtom)
  const [open, setOpen] = useState(false)
  return (
    <div className="flex p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          variant="shine"
          colors="none"
          size="lg"
          className="font-heading w-full"
          onClick={() => {
            if (!dubMedia.length) {
              return toast.error('No media selected', {
                description: 'Please select some media to dub.',
              })
            }
            console.log(dubLanguages)
            if (!dubLanguages.length) {
              return toast.error('No languages selected', {
                description: 'Please select at least one language.',
              })
            }
            setOpen(true)
          }}
        >
          Create dubs
        </Button>
        <DialogContent className="gap-2">
          <DialogHeader>
            <DialogTitle>Create dubs</DialogTitle>
            <DialogDescription>Create dubs for your media</DialogDescription>
            <DubSummary />
            <DialogFooter>
              <Button
                className="w-full font-heading"
                variant="shine"
                colors="none"
                size="lg"
                onClick={() => {
                  dub(dubMedia, dubLanguages, dubTokens)
                }}
              >
                Create dubs
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
