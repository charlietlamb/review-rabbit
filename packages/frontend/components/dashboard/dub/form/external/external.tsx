import { RiInstagramFill, RiTiktokFill, RiYoutubeFill } from '@remixicon/react'
import { Link } from 'lucide-react'

export const externalData = [
  {
    name: 'YouTube',
    start: 'https://www.youtu.be/',
    placeholder: 'your-video-id',
    icon: <RiYoutubeFill className="text-white" />,
    className: 'bg-social-youtube/80 hover:bg-social-youtube',
    error: 'Please enter a valid YouTube video URL.',
  },
  {
    name: 'Instagram',
    start: 'https://instagram.com/',
    placeholder: 'your-video-id',
    icon: <RiInstagramFill className="text-white" />,
    className: 'bg-social-instagram/80 hover:bg-social-instagram',
    error: 'Please enter a valid Instagram video URL.',
  },
  {
    name: 'Tiktok',
    start: 'https://tiktok.com/',
    placeholder: 'your-video-id',
    icon: <RiTiktokFill className="text-white" />,
    className: 'bg-social-tiktok/80 hover:bg-social-tiktok',
    error: 'Please enter a valid Tiktok video URL.',
  },
  {
    name: 'Other',
    start: '',
    placeholder: 'www.your-video-url.com',
    icon: <Link className="text-white" />,
    className: 'bg-social-reddit/80 hover:bg-social-reddit',
    error: 'Please enter a valid video URL.',
  },
] as ExternalPlatformData[]

export type ExternalPlatform = ExternalPlatformData['name']

export type ExternalPlatformData = {
  name: string
  start: string
  placeholder: string
  icon: React.ReactNode
  className: string
  error: string
}
