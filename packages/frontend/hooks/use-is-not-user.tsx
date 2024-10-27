import { redirect } from 'next/navigation'

export default function useIsNotUser(user: UserWithProfilePic | null) {
  if (user) {
    return redirect('/dashboard')
  }
  return
}
