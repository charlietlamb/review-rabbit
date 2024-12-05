import { DropzoneProps } from 'react-dropzone'
import { CreatePreviewShorts } from '../preview/shorts/create-preview-shorts'
import { Provider, providerDataById } from '@ff/design-system/lib/providers'
import { AcceptedMimeType } from 'data/file-types'
import { CreatePreviewVideo } from '../preview/video/create-preview-video'
import { CreatePreviewStory } from '../preview/story/create-preview-story'
import { CreatePreviewImage } from '../preview/image/create-preview-image'
import { CreatePreviewCarousel } from '../preview/carousel/create-form-carousel'

export type CreateOptionData = {
  id: string
  name: string
  providerIcons: Array<{ icon: React.ReactNode; name: string }>
  acceptedFileTypes?: DropzoneProps['accept']
  acceptedMimeTypes?: AcceptedMimeType[]
  single?: boolean
  description: string
  preview?: React.ReactNode
  providers?: Provider[]
}

export const createOptionTypes = [
  'image',
  'video',
  'short',
  'story',
  'carousel',
  'text',
] as const
export type CreateOptionType = (typeof createOptionTypes)[number]

const shortProviders = ['youtube', 'instagram', 'tiktok', 'snapchat']
const textProviders = ['youtube', 'x']
const carouselProviders = ['youtube', 'x', 'instagram', 'tiktok']
const videoProviders = ['youtube', 'x', 'instagram', 'tiktok', 'snapchat']
const imageProviders = ['youtube', 'x', 'instagram', 'tiktok', 'snapchat']
const storyProviders = ['youtube', 'x', 'instagram', 'tiktok', 'snapchat']

export const createOptionsMap = new Map<string, CreateOptionData>([
  [
    'short',
    {
      id: 'short',
      name: 'Short',
      acceptedFileTypes: { 'video/*': [] },
      acceptedMimeTypes: ['video'],
      single: true,
      description: 'A shortform video.',
      preview: <CreatePreviewShorts />,
      providers: shortProviders,
      providerIcons: shortProviders.map((provider) => ({
        icon: providerDataById[provider].colorIcon,
        name: provider,
      })),
    },
  ],
  [
    'text',
    {
      id: 'text',
      name: 'Text',
      acceptedFileTypes: {},
      acceptedMimeTypes: [],
      single: false,
      description: 'A text post.',
      providers: textProviders,
      providerIcons: textProviders.map((provider) => ({
        icon: providerDataById[provider].colorIcon,
        name: provider,
      })),
    },
  ],
  [
    'carousel',
    {
      id: 'carousel',
      name: 'Carousel',
      acceptedFileTypes: { 'image/*': [], 'video/*': [] },
      acceptedMimeTypes: ['image', 'video'],
      single: false,
      description: 'A carousel of images or videos.',
      preview: <CreatePreviewCarousel />,
      providers: carouselProviders,
      providerIcons: carouselProviders.map((provider) => ({
        icon: providerDataById[provider].colorIcon,
        name: provider,
      })),
    },
  ],
  [
    'video',
    {
      id: 'video',
      name: 'Video',
      acceptedFileTypes: { 'video/*': [] },
      acceptedMimeTypes: ['video'],
      single: true,
      description: 'A single video.',
      preview: <CreatePreviewVideo />,
      providers: videoProviders,
      providerIcons: videoProviders.map((provider) => ({
        icon: providerDataById[provider].colorIcon,
        name: provider,
      })),
    },
  ],
  [
    'image',
    {
      id: 'image',
      name: 'Image',
      acceptedFileTypes: { 'image/*': [] },
      acceptedMimeTypes: ['image'],
      single: true,
      description: 'A single image.',
      preview: <CreatePreviewImage />,
      providers: imageProviders,
      providerIcons: imageProviders.map((provider) => ({
        icon: providerDataById[provider].colorIcon,
        name: provider,
      })),
    },
  ],
  [
    'story',
    {
      id: 'story',
      name: 'Story',
      acceptedFileTypes: { 'video/*': [], 'image/*': [] },
      acceptedMimeTypes: ['video', 'image'],
      single: true,
      description: 'A story of images or videos.',
      preview: <CreatePreviewStory />,
      providers: storyProviders,
      providerIcons: storyProviders.map((provider) => ({
        icon: providerDataById[provider].colorIcon,
        name: provider,
      })),
    },
  ],
])
