import {
  CarouselIcons,
  ShortIcons,
  TextIcons,
  VideoIcons,
  StoryIcons,
  ImageIcons,
} from '@dubble/design-system/components/dashboard/connect/provider/provider-icons'
import { DropzoneProps } from 'react-dropzone'

export type CreateOptionData = {
  id: string
  name: string
  providerIcons: Array<{ icon: JSX.Element; name: string }>
  variants?: any
  subVariants?: any
  acceptedFileTypes?: DropzoneProps['accept']
  single?: boolean
  description: string
}

export const createOptionsMap = new Map<string, CreateOptionData>([
  [
    'short',
    {
      id: 'short',
      name: 'Short',
      acceptedFileTypes: { 'video/*': [] },
      providerIcons: ShortIcons,
      single: true,
      description: 'A shortform video.',
    },
  ],
  [
    'text',
    {
      id: 'text',
      name: 'Text',
      providerIcons: TextIcons,
      acceptedFileTypes: {},
      single: false,
      description: 'A text post.',
    },
  ],
  [
    'carousel',
    {
      id: 'carousel',
      name: 'Carousel',
      providerIcons: CarouselIcons,
      acceptedFileTypes: { 'image/*': [], 'video/*': [] },
      single: false,
      description: 'A carousel of images or videos.',
    },
  ],
  [
    'video',
    {
      id: 'video',
      name: 'Video',
      providerIcons: VideoIcons,
      acceptedFileTypes: { 'video/*': [] },
      single: true,
      description: 'A single video.',
    },
  ],
  [
    'image',
    {
      id: 'image',
      name: 'Image',
      providerIcons: ImageIcons,
      acceptedFileTypes: { 'image/*': [] },
      single: true,
      description: 'A single image.',
    },
  ],
  [
    'story',
    {
      id: 'story',
      name: 'Story',
      providerIcons: StoryIcons,
      acceptedFileTypes: { 'video/*': [], 'image/*': [] },
      description: 'A story of images or videos.',
    },
  ],
])
