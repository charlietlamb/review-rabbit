import { Media } from '@ff/database/schema/media'

export default function OtherFilePreview({ media }: { media: Media }) {
  return <div>{media.name}</div>
}
