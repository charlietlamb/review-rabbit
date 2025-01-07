import DashboardContentHeader from '../header/dashboard-content-header'
export default function DashboardWrap({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col divide-y h-full flex-grow">
      <DashboardContentHeader title={title} subtitle={subtitle} />
      {children}
    </div>
  )
}
