import React from 'react'
import UpdatePasswordDialog from './update-password-dialog'
import { Label } from '@/components/ui/label'

export default function UpdatePassword() {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-base font-semibold font-heading">
        Update password
      </Label>
      <UpdatePasswordDialog />
    </div>
  )
}
