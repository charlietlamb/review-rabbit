import {
  RiInstagramFill,
  RiTiktokFill,
  RiYoutubeFill,
  RiTwitterXFill,
  RiSnapchatFill,
} from 'react-icons/ri'
import { cn } from '@dubble/design-system/lib/utils'
import SnapchatWithOutline from './snapchat-with-outline'

const iconClassName = 'w-4 h-4 min-w-4 min-h-4 text-white'
const wrapClassName = 'p-1 rounded-sm'

export const YouTubeIcon = () => {
  return (
    <div className={cn(wrapClassName, 'bg-social-youtube')}>
      <RiYoutubeFill className={iconClassName} />
    </div>
  )
}

export function InstagramIcon() {
  return (
    <div className={cn(wrapClassName, 'bg-social-instagram')}>
      <RiInstagramFill className={iconClassName} />
    </div>
  )
}

export function TikTokIcon() {
  return (
    <div className={cn(wrapClassName, 'bg-social-tiktok')}>
      <RiTiktokFill className={iconClassName} />
    </div>
  )
}

export const XIcon = () => {
  return (
    <div className={cn(wrapClassName, 'bg-social-x')}>
      <RiTwitterXFill className={iconClassName} />
    </div>
  )
}

export const SnapchatIcon = () => {
  return (
    <div className={cn('bg-social-snapchat rounded-sm p-[3px]')}>
      <SnapchatWithOutline iconClassName="w-[18px] h-[18px] min-w-[18px] min-h-[18px] " />
    </div>
  )
}

export const ShortIcons = [
  {
    icon: <YouTubeIcon />,
    name: 'YouTube',
  },
  {
    icon: <InstagramIcon />,
    name: 'Instagram',
  },
  {
    icon: <TikTokIcon />,
    name: 'TikTok',
  },
  {
    icon: <XIcon />,
    name: 'X',
  },
  {
    icon: <SnapchatIcon />,
    name: 'Snapchat',
  },
]

export const TextIcons = [
  {
    icon: <YouTubeIcon />,
    name: 'YouTube',
  },
  {
    icon: <XIcon />,
    name: 'X',
  },
]

export const CarouselIcons = [
  {
    icon: <YouTubeIcon />,
    name: 'YouTube',
  },
  {
    icon: <InstagramIcon />,
    name: 'Instagram',
  },
  {
    icon: <TikTokIcon />,
    name: 'TikTok',
  },
  {
    icon: <XIcon />,
    name: 'X',
  },
]

export const VideoIcons = [
  {
    icon: <YouTubeIcon />,
    name: 'YouTube',
  },
  {
    icon: <InstagramIcon />,
    name: 'Instagram',
  },
  {
    icon: <XIcon />,
    name: 'X',
  },
]

export const ImageIcons = [
  {
    icon: <InstagramIcon />,
    name: 'Instagram',
  },
]

export const StoryIcons = [
  {
    icon: <YouTubeIcon />,
    name: 'YouTube',
  },
  {
    icon: <InstagramIcon />,
    name: 'Instagram',
  },
  {
    icon: <TikTokIcon />,
    name: 'TikTok',
  },
  {
    icon: <SnapchatIcon />,
    name: 'Snapchat',
  },
]
