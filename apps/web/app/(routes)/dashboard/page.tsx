import Dashboard from '@rabbit/design-system/components/dashboard/dashboard/dashboard'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { status: string }
}) {
  const { status } = await searchParams
  return <Dashboard status={status} />
}
