import { uploadsSortAtom } from '@dubble/design-system/atoms/dashboard/upload/uploadsAtom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dubble/design-system/components/ui/select'
import { useAtom } from 'jotai'

export default function UploadToolbarSort() {
  const [sort, setSort] = useAtom(uploadsSortAtom)
  return (
    <Select
      value={sort}
      onValueChange={(value) =>
        setSort(
          value as
            | 'name'
            | 'newest'
            | 'oldest'
            | 'smallest'
            | 'largest'
            | 'type'
        )
      }
    >
      <SelectTrigger id="select-16" className="w-auto min-w-32 hidden lg:flex">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">Name</SelectItem>
        <SelectItem value="newest">Most Recent</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="smallest">Smallest</SelectItem>
        <SelectItem value="largest">Largest</SelectItem>
        <SelectItem value="type">Type</SelectItem>
      </SelectContent>
    </Select>
  )
}
