import React from 'react'
import { z } from 'zod'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { cn } from '@/lib/utils'
import { Mail } from 'lucide-react'
import FieldInfo from '@/components/form/field-info'

export default function Email({ form }: { form: TanstackForm<any> }) {
  return (
    <form.Field name="email" validators={{ onChange: z.string().email() }}>
      {(field) => (
        <div className="flex flex-col gap-1">
          <Label
            htmlFor={field.name}
            className="font-heading text-base font-semibold"
          >
            Email
          </Label>
          <div className="relative">
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value ?? ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Email"
              type="email"
              className={cn(
                '',
                field.state.meta.errors.some((error) => error) &&
                  'peer pe-9 border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
              )}
            />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Mail
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className={cn(
                  field.state.meta.errors.some((error) => error) &&
                    'text-destructive/80'
                )}
              />
            </div>
          </div>
          <FieldInfo field={field} />
        </div>
      )}
    </form.Field>
  )
}
