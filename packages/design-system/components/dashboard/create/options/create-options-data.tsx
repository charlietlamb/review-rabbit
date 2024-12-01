import { DropzoneProps } from 'react-dropzone'
import { CreatePreviewShorts } from '../preview/create-preview-shorts'
import { Provider, providerDataById } from '@ff/design-system/lib/providers'
import { AcceptedMimeType } from 'data/file-types'

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
      description: 'A story of images or videos.',
      providers: storyProviders,
      providerIcons: storyProviders.map((provider) => ({
        icon: providerDataById[provider].colorIcon,
        name: provider,
      })),
    },
  ],
])
