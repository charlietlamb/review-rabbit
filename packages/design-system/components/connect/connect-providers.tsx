import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@dubble/design-system/components/ui/card'
import { GoogleConnect } from './providers/google-connect'
import { InstagramConnect } from './providers/instagram-connect'
import { Skeleton } from '../ui/skeleton'
import { Suspense } from 'react'

export function ConnectProviders() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>YouTube</CardTitle>
          <CardDescription>
            Connect your Google account to enable YouTube integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <GoogleConnect />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instagram</CardTitle>
          <CardDescription>
            Connect your Instagram account to enable content sharing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <InstagramConnect />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
