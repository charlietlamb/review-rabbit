import { createContext, useContext } from 'react'
import type { ToolbarContext as ToolbarContextType } from './toolbar-types'

export const ToolbarContext = createContext<ToolbarContextType | undefined>(
  undefined
)

export function useToolbarContext() {
  const context = useContext(ToolbarContext)
  if (!context) {
    throw new Error('useToolbarContext must be used within a ToolbarProvider')
  }
  return context
}
