import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@rabbit/design-system/components/ui/dropdown-menu'
import { Button } from '@rabbit/design-system/components/ui/button'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Business } from '@rabbit/database/schema/app/businesses'
import BusinessFormDialog from './business-form-dialog'
import DangerDialog from '@rabbit/design-system/components/misc/danger-dialog'
import { deleteBusiness } from '@rabbit/design-system/actions/business/delete-business'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { HttpStatusCodes } from '@rabbit/http'
import { toast } from 'sonner'

export default function BusinessTableDropdown({
  business,
}: {
  business: Business
}) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  async function handleDelete() {
    const status = await deleteBusiness(business.id)
    await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BUSINESS })
    if (status === HttpStatusCodes.OK) {
      toast.success('Business successfully deleted', {
        description: 'It will be removed from your dashboard shortly',
      })
    } else {
      toast.error('Failed to delete business', {
        description: 'Please try again later',
      })
    }
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          colors="ghost"
          size="iconSm"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen(true)
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] p-0"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <BusinessFormDialog business={business}>
            <Button variant="ghost" className="w-full justify-start">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </BusinessFormDialog>
        </div>
        <DropdownMenuSeparator className="bg-border m-0" />
        <div className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <DangerDialog
            title="Delete Business"
            description="Are you sure you want to delete this business?"
            onClick={handleDelete}
          >
            <Button variant="ghostDestructive" className="w-full justify-start">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DangerDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
