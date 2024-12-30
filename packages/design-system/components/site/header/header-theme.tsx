import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@burse/design-system/components/ui/popover'
import Theme from '@burse/design-system/components/dashboard/settings/theme/theme'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function HeaderTheme() {
  const { resolvedTheme } = useTheme()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-full aspect-square flex items-center justify-center hover:bg-muted transition-colors duration-300 w-16 min-w-16 cursor-pointer">
          {resolvedTheme === 'light' ? <Sun /> : <Moon />}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Theme />
      </PopoverContent>
    </Popover>
  )
}
