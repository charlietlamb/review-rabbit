import { FormApi, ReactFormApi } from '@tanstack/react-form'
import { ZodValidator } from '@tanstack/zod-form-adapter'

export type TanstackForm<T> = FormApi<T, ZodValidator> &
  ReactFormApi<T, ZodValidator>
