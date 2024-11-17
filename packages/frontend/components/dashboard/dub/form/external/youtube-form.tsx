import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function YoutubeForm() {
  return (
    <DialogContent className="gap-2">
      <DialogHeader>
        <DialogTitle>Youtube</DialogTitle>
      </DialogHeader>
      <DialogDescription>Add a Youtube video to your dubs.</DialogDescription>
    </DialogContent>
  )
}
