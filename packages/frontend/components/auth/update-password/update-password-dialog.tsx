import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { z } from 'zod'
import Password from '../form/password'
import PasswordStrength from '../form/password-strength'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { authClient } from '@/authClient'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Lock } from 'lucide-react'

const updatePasswordSchema = z.object({
  password: z.string().min(1),
  newPassword: z.string().min(1),
})

type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>

export default function UpdatePasswordDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
    } as UpdatePasswordSchema,
    onSubmit: async (values) => {
      const res = await authClient.changePassword({
        currentPassword: values.formApi.getFieldValue('password'),
        newPassword: values.formApi.getFieldValue('newPassword'),
        revokeOtherSessions: true,
      })
      if (res.error) {
        console.error('Failed to update password')
      } else {
        toast.success('Password updated', {
          description:
            'Your password has been updated successfully. All other sessions have been revoked.',
        })
        setOpen(false)
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: updatePasswordSchema,
    },
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">Update password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update password</DialogTitle>
        <form className="flex flex-col gap-2">
          <Password form={form} />
          <PasswordStrength
            form={form}
            name="newPassword"
            label="New password"
          />
          <Button type="submit">Update password</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
