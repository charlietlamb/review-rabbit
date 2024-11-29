import { RiInstagramFill, RiTiktokFill, RiYoutubeFill } from '@remixicon/react'

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
    classNameBorder: 'border-social-youtube/80 hover:border-social-youtube',
    error: 'Please enter a valid YouTube video URL.',
    info: 'Make sure to allow all access to your YouTube account. We will never post anything without your permission.',
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
    classNameBorder: 'border-social-instagram/80 hover:border-social-instagram',
    error: 'Please enter a valid Instagram video URL.',
    info: 'Your account must be a business/creator account to connect to Instagram. We will never post anything without your permission.',
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
    classNameBorder: 'border-social-tiktok/80 hover:border-social-tiktok',
    error: 'Please enter a valid Tiktok video URL.',
    info: 'Your account must be a business/creator account to connect to Tiktok. We will never post anything without your permission.',
  },
] as ProviderData[]

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
  classNameBorder: string
  error: string
  info: string
}
