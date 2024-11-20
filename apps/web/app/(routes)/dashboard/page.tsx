import Dub from '@/components/dashboard/dub/dub'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  redirect('/dashboard/dub')
  return <Dub />
}
