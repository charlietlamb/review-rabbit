import DialogProvider from '../dashboard/provider/DialogProvider'
import TanstackQueryProvider from './TanstackQueryProvider'
import ThemeProvider from './ThemeProvider'
import UserProvider from './UserProvider'

export default function Providers({
  user,
  className,
  children,
}: {
  user: User | null
  className?: string
  children: React.ReactNode
}) {
  return (
    <TanstackQueryProvider>
      <UserProvider user={user}>
        <body className={className}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <DialogProvider />
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </TanstackQueryProvider>
  )
}
