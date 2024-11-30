'use client'

import { useAnimation } from 'motion/react'
import { createOptionsMap } from './create-options-data'
import ShortsIcon from './icons/shorts'
import TextIcon from './icons/text'
import CarouselIcon from './icons/carousel'
import VideoIcon from './icons/video'
import StoryIcon from './icons/story'
import ImageIcon from './icons/image'
import CreateOption from './create-option'
import { imageTransition, shortsVariants } from './icons/option-motion-values'
import {
  carouselSubVariants,
  carouselVariants,
  shortsSubVariants,
  storyVariants,
  textVariants,
  videoVariants,
} from './icons/option-motion-values'
import CreateOptionsHeader from './create-options-header'

export default function CreateOptions() {
  const controls = {
    short: useAnimation(),
    text: useAnimation(),
    carousel: useAnimation(),
    video: useAnimation(),
    image: useAnimation(),
    story: useAnimation(),
  }
  const icons = {
    short: (
      <ShortsIcon
        options={shortsVariants}
        subOptions={shortsSubVariants}
        controls={controls.short}
      />
    ),
    text: <TextIcon controls={controls.text} variants={textVariants} />,
    carousel: (
      <CarouselIcon
        controls={controls.carousel}
        variants={carouselVariants}
        subVariants={carouselSubVariants}
      />
    ),
    video: <VideoIcon controls={controls.video} variants={videoVariants} />,
    image: <ImageIcon controls={controls.image} transition={imageTransition} />,
    story: <StoryIcon controls={controls.story} variants={storyVariants} />,
  }

  return (
    <div className="flex flex-col divide-y">
      <CreateOptionsHeader />
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array.from(createOptionsMap).map(([key, option]) => (
          <CreateOption
            key={key}
            controls={controls[key as keyof typeof controls]}
            icon={icons[key as keyof typeof icons]}
            name={option.name}
            providers={option.providerIcons}
          />
        ))}
      </div>
    </div>
  )
}
