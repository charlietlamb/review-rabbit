import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import FieldInfo from '@/components/form/field-info'
import { useState } from 'react'

export default function Password({ form }: { form: TanstackForm<any> }) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  return (
    <form.Field name="password" validators={{ onChange: z.string().min(8) }}>
      {(field) => (
        <div className="flex flex-col gap-1">
          <Label
            htmlFor={field.name}
            className="font-heading text-base font-semibold"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value ?? ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Password"
              type={isVisible ? 'text' : 'password'}
              className={cn(
                '',
                field.state.meta.errors.some((error) => error) &&
                  'peer pe-9 border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
              )}
            />
            <button
              className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? 'Hide password' : 'Show password'}
              aria-pressed={isVisible}
              aria-controls="password"
            >
              {isVisible ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
          <FieldInfo field={field} />
        </div>
      )}
    </form.Field>
  )
}
