import {
  RiInstagramFill,
  RiTiktokFill,
  RiYoutubeFill,
  RiTwitterXFill,
} from 'react-icons/ri'
import { cn } from '@ff/design-system/lib/utils'
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
