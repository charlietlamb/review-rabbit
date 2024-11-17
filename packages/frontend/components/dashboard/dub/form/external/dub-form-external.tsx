import { RiInstagramFill, RiTiktokFill, RiYoutubeFill } from '@remixicon/react'
import DubFormExternalItem from './dub-form-external-item'
import YoutubeForm from './youtube-form'
import InstagramForm from './instagram-form'
import { Link } from 'lucide-react'

const textClassName = 'hidden md:inline-block'

export default function DubFormExternal() {
  return (
    <div className="flex gap-2">
      <DubFormExternalItem
        content={<YoutubeForm />}
        className="bg-social-youtube/80 hover:bg-social-youtube"
      >
        <RiYoutubeFill className="text-white" />
        <p className={textClassName}>YouTube</p>
      </DubFormExternalItem>

      <DubFormExternalItem
        content={<InstagramForm />}
        className="bg-social-instagram/80 hover:bg-social-instagram"
      >
        <RiInstagramFill className="text-white" />
        <p className={textClassName}>Instagram</p>
      </DubFormExternalItem>

      <DubFormExternalItem
        content={<InstagramForm />}
        className="bg-social-tiktok/80 hover:bg-social-tiktok"
      >
        <RiTiktokFill className="text-white" />
        <p className={textClassName}>Tiktok</p>
      </DubFormExternalItem>

      <DubFormExternalItem
        content={<InstagramForm />}
        className="bg-social-reddit/80 hover:bg-social-reddit"
      >
        <Link className="text-white" />
        <p className={textClassName}>Other</p>
      </DubFormExternalItem>
    </div>
  )
}
