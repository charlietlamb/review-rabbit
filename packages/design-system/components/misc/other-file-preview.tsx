import { Media } from '@rabbit/database/schema/media'

export default function OtherFilePreview({ media }: { media: Media }) {
  return <div>{media.name}</div>
}
