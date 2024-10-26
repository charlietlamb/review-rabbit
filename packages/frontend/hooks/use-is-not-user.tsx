import { redirect } from 'next/navigation'

export default function useIsNotUser(user: User | null) {
  if (user) {
    return redirect('/dashboard')
  }
  return
}
