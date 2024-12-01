import Upload from '@ff/design-system/components/dashboard/upload/upload'
import { fetchMedia } from '@ff/design-system/actions/media/fetch-media'

export default async function page() {
  const initialUploads: Media[] = await fetchMedia('user', 0)
  return <Upload initialUploads={initialUploads} />
}
