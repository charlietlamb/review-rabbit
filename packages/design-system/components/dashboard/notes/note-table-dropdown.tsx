import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@remio/design-system/components/ui/dropdown-menu'
import { Button } from '@remio/design-system/components/ui/button'
import { Download, MoreHorizontal, Pencil } from 'lucide-react'
import NoteEditDialog from './note-edit-dialog'
import { NoteWithMediation } from '@remio/database'
import useUser from '@remio/design-system/hooks/use-user'

export default function NoteTableDropdown({
  note,
}: {
  note: NoteWithMediation
}) {
  const user = useUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          colors="ghost"
          size="iconSm"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] p-0">
        <DropdownMenuItem className="cursor-pointer" asChild>
          <NoteEditDialog note={note} mediation={note.mediation} redirect>
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-border transition-colors">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </div>
          </NoteEditDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
