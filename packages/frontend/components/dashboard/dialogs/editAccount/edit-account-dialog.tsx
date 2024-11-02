'use client'

import { dialogKeyAtom, dialogOpenAtom } from '@/atoms/dialog/dialog-atoms'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { EDIT_ACCOUNT_DIALOG_KEY } from '@/constants/dialog/dialog-keys'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

export default function EditAccountDialog() {
  const dialogOpen = useAtomValue(dialogOpenAtom)
  const dialogKey = useAtomValue(dialogKeyAtom)
  const [open, setOpen] = useState(
    dialogKey === EDIT_ACCOUNT_DIALOG_KEY && dialogOpen
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account Details</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
