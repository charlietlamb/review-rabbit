'use client'

import { Input } from '@rabbit/design-system/components/ui/input'
import { Label } from '@rabbit/design-system/components/ui/label'
import { Check, Eye, EyeOff, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import FieldInfo from '@rabbit/design-system/components/form/field-info'
import { z } from 'zod'
import { cn } from '@rabbit/design-system/lib/utils'
import { TanstackForm } from '@rabbit/design-system/components/form/tanstack-form'
import { useFormContext } from '@rabbit/design-system/components/form/form-context'

export default function PasswordStrength({
  form,
  name = 'password',
  label = 'Password',
}: {
  form: TanstackForm<any>
  name?: string
  label?: string
}) {
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { attemptSubmitted } = useFormContext()

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    ]

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }))
  }

  const strength = checkStrength(password)

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length
  }, [strength])

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border'
    if (score <= 1) return 'bg-red-500'
    if (score <= 2) return 'bg-orange-500'
    if (score === 3) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return 'Enter a password'
    if (score <= 2) return 'Weak password'
    if (score === 3) return 'Medium password'
    return 'Strong password'
  }

  return (
    <div>
      <form.Field name={name} validators={{ onChange: z.string().min(8) }}>
        {(field) => (
          <div className="space-y-2">
            <Label
              htmlFor={field.name}
              className="font-heading text-base font-semibold text-foreground"
            >
              {label}
            </Label>
            <div className="relative">
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                  setPassword(e.target.value)
                }}
                placeholder="Password"
                type={isVisible ? 'text' : 'password'}
                className={cn(
                  '',
                  attemptSubmitted &&
                    field.state.meta.errors.some((error) => error) &&
                    'peer pe-9 border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                )}
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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

            {attemptSubmitted && <FieldInfo field={field} />}
          </div>
        )}
      </form.Field>
      <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(
            strengthScore
          )} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      <p
        id="password-strength"
        className="mb-2 text-sm font-medium text-foreground font-heading"
      >
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      {/* Password requirements list */}
      <ul
        className="space-y-1.5 font-heading"
        aria-label="Password requirements"
      >
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${
                req.met ? 'text-emerald-600' : 'text-muted-foreground'
              }`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? ' - Requirement met' : ' - Requirement not met'}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
