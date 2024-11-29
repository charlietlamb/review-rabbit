import { BaseProfile } from '../../connect/types'
import { YouTubeProfile } from '../../connect/providers/youtube'
import { InstagramProfile } from '../../connect/providers/instagram'

export function getAccountId(profile: BaseProfile, providerId: string) {
  return providerId === 'youtube'
    ? (profile as YouTubeProfile).sub
    : providerId === 'instagram'
    ? (profile as InstagramProfile).id
    : profile.id
}

export function getAccountName(profile: BaseProfile, providerId: string) {
  return providerId === 'youtube'
    ? (profile as YouTubeProfile).channelName ||
        (profile as YouTubeProfile).given_name
    : (profile as InstagramProfile).username
}

export function getUsername(profile: BaseProfile, providerId: string) {
  return providerId === 'youtube'
    ? (profile as YouTubeProfile).channelName
    : (profile as InstagramProfile).username
}

export function getProfileImageUrl(profile: BaseProfile, providerId: string) {
  return providerId === 'instagram'
    ? (profile as InstagramProfile).profile_picture_url
    : profile.picture || null
}
