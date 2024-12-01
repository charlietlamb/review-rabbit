import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ff/design-system/components/ui/select'
import { useToolbarContext } from './toolbar-context'

export default function ToolbarSort() {
  const { sort, setSort, sortOptions } = useToolbarContext()
  return (
    <Select value={sort} onValueChange={(value) => setSort(value)}>
      <SelectTrigger id="select-16" className="w-auto min-w-32 hidden lg:flex">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
