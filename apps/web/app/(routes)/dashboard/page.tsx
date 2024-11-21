import Dub from '@dubble/design-system/components/dashboard/dub/dub'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  redirect('/dashboard/dub')
  return <Dub />
}
