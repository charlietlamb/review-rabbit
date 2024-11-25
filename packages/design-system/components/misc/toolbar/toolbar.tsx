import { Dispatch, SetStateAction } from 'react'
import ToolbarLayout from './toolbar-layout'
import ToolbarSearch from './toolbar-search'
import ToolbarSort from './toolbar-sort'
import { ToolbarProps } from './toolbar-types'
import { ToolbarContext } from './toolbar-context'

export default function Toolbar(props: ToolbarProps) {
  const { button, ...rest } = props
  return (
    <ToolbarContext.Provider value={rest}>
      <div className="flex items-center gap-4 p-4 pb-0">
        <ToolbarSearch />
        <ToolbarLayout />
        <ToolbarSort />
        <ToolbarLayout />
        {props.button}
      </div>
    </ToolbarContext.Provider>
  )
}
