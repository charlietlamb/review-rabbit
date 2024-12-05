import {
  RiInstagramFill,
  RiTiktokFill,
  RiYoutubeFill,
  RiTwitterXFill,
  RiSnapchatFill,
} from '@remixicon/react'
import {
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
  SnapchatIcon,
} from '@ff/design-system/components/dashboard/connect/provider/provider-icons'

export const providerData = [
  {
    id: 'youtube',
    name: 'YouTube',
    company: 'Google',
    start: 'https://www.youtu.be/',
    placeholder: 'your-video-id',
    icon: <RiYoutubeFill />,
    className:
      'bg-social-youtube/80 hover:bg-social-youtube group-hover:bg-social-youtube',
    classNameText: 'text-social-youtube',
    classNameTextOnBackground: 'text-white',
    classNameBorder: 'border-social-youtube/80 hover:border-social-youtube',
    error: 'Please enter a valid YouTube video URL.',
    info: 'Make sure to allow all access to your YouTube account. We will never post anything without your permission.',
    colorIcon: <YouTubeIcon />,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    company: 'Meta',
    start: 'https://instagram.com/',
    placeholder: 'your-video-id',
    icon: <RiInstagramFill />,
    className:
      'bg-social-instagram/80 hover:bg-social-instagram group-hover:bg-social-instagram',
    classNameText: 'text-social-instagram',
    classNameTextOnBackground: 'text-white',
    classNameBorder: 'border-social-instagram/80 hover:border-social-instagram',
    error: 'Please enter a valid Instagram video URL.',
    info: 'Your account must be a business/creator account to connect to Instagram. We will never post anything without your permission.',
    colorIcon: <InstagramIcon />,
  },
  {
    id: 'tiktok',
    name: 'Tiktok',
    company: 'ByteDance',
    start: 'https://tiktok.com/',
    placeholder: 'your-video-id',
    icon: <RiTiktokFill />,
    className:
      'bg-social-tiktok/80 hover:bg-social-tiktok group-hover:bg-social-tiktok',
    classNameText: 'text-social-tiktok',
    classNameTextOnBackground: 'text-white',
    classNameBorder: 'border-social-tiktok/80 hover:border-social-tiktok',
    error: 'Please enter a valid Tiktok video URL.',
    info: 'Your account must be a business/creator account to connect to Tiktok. We will never post anything without your permission.',
    colorIcon: <TikTokIcon />,
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    company: 'X Corp',
    start: 'https://twitter.com/',
    placeholder: 'your-tweet-id',
    icon: <RiTwitterXFill />,
    className: 'bg-social-x/80 hover:bg-social-x group-hover:bg-social-x',
    classNameText: 'text-social-x',
    classNameTextOnBackground: 'text-white',
    classNameBorder: 'border-social-x/80 hover:border-social-x',
    error: 'Please enter a valid X (Twitter) post URL.',
    info: 'Make sure to allow all access to your X account. We will never post anything without your permission.',
    colorIcon: <XIcon />,
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    company: 'Snap Inc.',
    start: 'https://snapchat.com/',
    placeholder: 'your-snap-id',
    icon: <RiSnapchatFill />,
    className:
      'bg-social-snapchat/80 hover:bg-social-snapchat/90 group-hover:bg-social-snapchat/90',
    classNameText: 'text-social-snapchat',
    classNameTextOnBackground: 'text-black',
    classNameBorder: 'border-social-snapchat/80 hover:border-social-snapchat',
    error: 'Please enter a valid Snapchat URL.',
    info: 'Your account must be a business/creator account to connect to Snapchat. We will never post anything without your permission.',
    colorIcon: <SnapchatIcon />,
  },
] as ProviderData[]

export const providerIds = [
  'youtube',
  'instagram',
  'tiktok',
  'x',
  'snapchat',
] as const

export const providerDataById = providerData.reduce((acc, platform) => {
  acc[platform.id] = platform
  return acc
}, {} as Record<ProviderData['id'], ProviderData>)

export type Provider = ProviderData['name']

export type ProviderData = {
  id: string
  name: string
  company: string
  start: string
  placeholder: string
  icon: React.ReactNode
  className: string
  classNameText: string
  classNameTextOnBackground: string
  classNameBorder: string
  error: string
  info: string
  colorIcon: React.ReactNode
}
