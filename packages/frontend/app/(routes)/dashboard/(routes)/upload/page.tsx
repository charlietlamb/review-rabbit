import Upload from '@/components/dashboard/upload/upload'
import { fetchMedia } from '@/actions/media/fetch-media'

export default async function page() {
  const initialUploads: Media[] = await fetchMedia('user', 0)
  return <Upload initialUploads={initialUploads} />
}
