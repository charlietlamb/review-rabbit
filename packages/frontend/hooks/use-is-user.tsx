import { redirect } from 'next/navigation'

export default function useIsUser(user: User | null) {
  if (user === null) {
    return redirect('/login')
  }
  return
}
