'use client'

import { Button } from '@burse/design-system/components/ui/button'
import { Textarea } from '@burse/design-system/components/ui/textarea'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-form-adapter'
import InputWithIcon from '@burse/design-system/components/form/input/input-with-icon'
import { UserIcon } from 'lucide-react'
import { MailIcon } from 'lucide-react'

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
})

export function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: (values) => {},
    validatorAdapter: zodValidator(),
    validators: {
      onChange: contactFormSchema,
    },
  })

  return (
    <div className="mb-12">
      <h2 className="font-heading mb-4 text-2xl font-semibold text-foreground">
        Send Us a Message
      </h2>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <InputWithIcon
          icon={<UserIcon />}
          placeholder="Name"
          name="name"
          form={form}
          required
          type="text"
          label="Name"
        />
        <InputWithIcon
          icon={<MailIcon />}
          placeholder="Email"
          name="email"
          form={form}
          required
          type="email"
          label="Email"
        />
        <div>
          <form.Field name="message">
            {(field) => (
              <Textarea
                name={field.name}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Your Message"
                className="w-full min-h-[150px]"
              />
            )}
          </form.Field>
        </div>
        <Button type="submit" className="w-full mt-4">
          Send Message
        </Button>
      </form>
    </div>
  )
}
