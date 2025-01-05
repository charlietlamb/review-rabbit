import { Business } from '@rabbit/database'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@rabbit/design-system/components/ui/avatar'
import { getEnv } from '@rabbit/env'
import { Button } from '@rabbit/design-system/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteBusiness } from '@rabbit/design-system/actions/business/delete-business'
import DangerDialog from '@rabbit/design-system/components/misc/danger-dialog'
import BusinessFormDialog from './business-form-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { HttpStatusCodes } from '@rabbit/http'
import { toast } from 'sonner'

export default function BusinessItem({ business }: { business: Business }) {
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
    <div className="flex items-center border rounded-lg h-16 divide-x overflow-hidden">
      <Avatar className="rounded-l-lg rounded-r-none h-full size-[62px]">
        <AvatarImage
          src={
            business.image
              ? `${getEnv().NEXT_PUBLIC_AWS_S3_URL}${business.image}`
              : undefined
          }
        />
        <AvatarFallback className="rounded-lg">
          {business.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-row items-center gap-2 h-full flex-grow p-2">
        <div className="flex flex-col">
          <div className="font-bold">{business.name}</div>
          <div className="text-sm text-muted-foreground">{business.email}</div>
        </div>
        <div className="ml-auto flex items-center gap-2 pr-2">
          <BusinessFormDialog business={business}>
            <Button variant="ghost" size="icon" className="size-7 p-1">
              <Pencil />
            </Button>
          </BusinessFormDialog>
          <DangerDialog
            title="Delete Business"
            description="Are you sure you want to delete this business?"
            onClick={handleDelete}
          >
            <Button
              variant="ghostDestructive"
              size="icon"
              className="size-7 p-1"
            >
              <Trash2 />
            </Button>
          </DangerDialog>
        </div>
      </div>
    </div>
  )
}
