import { ProviderData } from '@dubble/design-system/lib/providers'
import { cn } from '@dubble/design-system/lib/utils'
import {
  Card,
  CardContent,
  CardHeader,
} from '@dubble/design-system/components/ui/card'
import { useRouter } from 'next/navigation'

export default function ProviderCard({ provider }: { provider: ProviderData }) {
  const router = useRouter()

  return (
    <Card
      className="flex-grow w-full rounded-lg p-0 divide-y cursor-pointer bg-background hover:bg-muted transition-all duration-300"
      onClick={() =>
        router.push(`/dashboard/connect/${provider.name.toLowerCase()}`)
      }
    >
      <CardHeader className="flex flex-row items-center gap-2 p-2 text-lg font-heading font-bold">
        {provider.colorIcon}
        {provider.name}
      </CardHeader>
      <CardContent className="p-2 text-muted-foreground text-sm">
        {provider.info}
      </CardContent>
    </Card>
  )
}
