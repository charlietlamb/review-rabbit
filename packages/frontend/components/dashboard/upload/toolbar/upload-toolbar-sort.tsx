import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function UploadToolbarSort() {
  return (
    <Select>
      <SelectTrigger id="select-16" className="w-auto min-w-32 hidden lg:flex">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="s1">Name</SelectItem>
        <SelectItem value="s2">Date</SelectItem>
        <SelectItem value="s3">Size</SelectItem>
        <SelectItem value="s4">Type</SelectItem>
      </SelectContent>
    </Select>
  )
}
