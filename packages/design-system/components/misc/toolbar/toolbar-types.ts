import { Dispatch, SetStateAction } from 'react'

export type ToolbarContext = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  sort: string
  setSort: Dispatch<SetStateAction<string>>
  sortOptions: {
    label: string
    value: string
  }[]
  layout: string
  setLayout: Dispatch<SetStateAction<string>>
}

export type ToolbarProps = {
  button: React.ReactNode
} & ToolbarContext
