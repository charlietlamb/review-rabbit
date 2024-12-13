import { createContext, useContext } from 'react'

type FormContextType = {
  attemptSubmitted: boolean
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

export const FormProvider = FormContext.Provider

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
