import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function DubFormSubmit() {
  return (
    <div className="flex p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="shine"
            colors="none"
            size="lg"
            className="font-heading w-full"
          >
            Create dubs
          </Button>
        </DialogTrigger>
        <DialogContent></DialogContent>
      </Dialog>
    </div>
  )
}
