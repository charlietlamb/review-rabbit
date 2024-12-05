import { Media } from '@remio/database/schema/media'

export default function OtherFilePreview({ media }: { media: Media }) {
  return <div>{media.name}</div>
}
