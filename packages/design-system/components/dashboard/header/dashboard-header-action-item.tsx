export default function DashboardHeaderActionItem({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-heading font-bold px-4 h-full flex items-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer">
      {children}
    </div>
  )
}
