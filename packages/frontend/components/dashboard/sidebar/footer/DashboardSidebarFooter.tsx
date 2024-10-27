'use client'

import { userAtom } from '@/atoms/user/userAtom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { getProfilePicUrl } from '@/lib/getProfilePicUrl'
import { useAtomValue } from 'jotai'
import { ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DashboardSidebarFooter() {
  const user = useAtomValue(userAtom)
  const [image, setImage] = useState<string | undefined>(undefined)
  useEffect(() => {
    async function fetchImage() {
      if (!user?.id) return
      const presignedUrl = await getProfilePicUrl(user.id)
      setImage(presignedUrl)
    }
    fetchImage()
  }, [user])
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={image}
                    alt={user?.name ?? ''}
                    className="object-cover mx-auto my-auto"
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.[0] ?? 'CN'}
                    {user?.name?.split(' ')[1]?.[0] ?? ''}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
