'use client'

import { useEffect, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { createThumbnailTimeAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { Slider } from '@ff/design-system/components/ui/slider'
import { AspectRatio } from '@ff/design-system/components/ui/aspect-ratio'
import { Label } from '@ff/design-system/components/ui/label'
import { Dispatch, SetStateAction } from 'react'

interface VideoAspectRatio {
  width: number
  height: number
}

export default function CreateFormPreviewThumbnailSelect({
  url,
  time,
  setTime,
  mobile = false,
}: {
  url: string
  time: number
  setTime: Dispatch<SetStateAction<number>>
  mobile?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const previewRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [thumbnailTime, setThumbnailTime] = useAtom(createThumbnailTimeAtom)
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>({
    width: 16,
    height: 9,
  })

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)

    if (!mobile) {
      // Use actual video dimensions for non-shorts
      setAspectRatio({
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      })
    } else {
      // Force 9:16 ratio for mobile
      setAspectRatio({ width: 9, height: 16 })
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    setTime(videoRef.current.currentTime)
  }

  const handleSliderChange = (value: number[]) => {
    const time = value[0]
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.currentTime = thumbnailTime
    }
  }, [thumbnailTime])

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative flex flex-col gap-2">
          <Label>Video Preview</Label>
          <AspectRatio
            ratio={aspectRatio.width / aspectRatio.height}
            className="bg-black rounded-lg overflow-hidden"
          >
            <video
              ref={videoRef}
              src={url}
              className="w-full h-full object-cover"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              playsInline
            />
          </AspectRatio>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <Label>Selected Thumbnail</Label>
          </div>
          <AspectRatio
            ratio={aspectRatio.width / aspectRatio.height}
            className="bg-black rounded-lg overflow-hidden"
          >
            <video
              ref={previewRef}
              src={url}
              className="w-full h-full object-cover"
              playsInline
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Change the slider position to select the thumbnail
        </p>
        <Slider
          value={[time]}
          min={0}
          max={duration}
          step={0.001}
          onValueChange={handleSliderChange}
          className="w-full border rounded-full cursor-pointer"
          thumbClassName="hidden"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(time)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
