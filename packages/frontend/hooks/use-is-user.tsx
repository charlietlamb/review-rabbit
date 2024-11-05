import { redirect } from 'next/navigation'

export default function useIsUser(user: User | null) {
  console.log('------------------')
  console.log('User ....', user)
  console.log('------------------')
  console.log(user === null)
  console.log(user === undefined)
  console.log(!user)
  if (user === null) {
    return redirect('/')
  }
  return
}
