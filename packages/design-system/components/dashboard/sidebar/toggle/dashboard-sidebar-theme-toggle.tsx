import { Moon, Sun } from 'lucide-react'
import { Button } from '@ff/design-system/components/ui/button'
import { useTheme } from 'next-themes'
import { useSidebar } from '@ff/design-system/components/ui/sidebar'

export default function DashboardSidebarThemeToggle({
  closed = false,
}: {
  closed?: boolean
}) {
  const { open } = useSidebar()
  const { theme, setTheme } = useTheme()
  if ((!open && !closed) || (open && closed)) return null
  return (
    <Button
      variant="ghost"
      size="iconSm"
      colors="none"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
