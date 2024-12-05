'use client'

import { Button } from '@remio/design-system/components/ui/button'
import { Input } from '@remio/design-system/components/ui/input'
import { Textarea } from '@remio/design-system/components/ui/textarea'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-form-adapter'
import Name from '@remio/design-system/components/auth/form/name'
import Email from '@remio/design-system/components/auth/form/email'

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
    onSubmit: (values) => {
      console.log('Form submitted:', values)
    },
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
        <Name form={form} />
        <Email form={form} />
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
