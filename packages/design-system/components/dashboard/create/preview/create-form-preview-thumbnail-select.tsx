'use client'

import { useEffect, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { createThumbnailTimeAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { Button } from '@ff/design-system/components/ui/button'
import { Slider } from '@ff/design-system/components/ui/slider'
import { Play, Pause } from 'lucide-react'
import { AspectRatio } from '@ff/design-system/components/ui/aspect-ratio'
import { cn } from '@ff/design-system/lib/utils'

interface CreateFormPreviewThumbnailSelectProps {
  url: string
}

export default function CreateFormPreviewThumbnailSelect({
  url,
}: CreateFormPreviewThumbnailSelectProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const previewRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [thumbnailTime, setThumbnailTime] = useAtom(createThumbnailTimeAtom)

  useEffect(() => {
    if (!videoRef.current || !previewRef.current) return
    videoRef.current.currentTime = thumbnailTime
    previewRef.current.currentTime = thumbnailTime
  }, [thumbnailTime])

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
    // Set initial thumbnail time to 0
    setThumbnailTime(0)
  }

  const handlePlayPause = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current || !previewRef.current) return
    if (isPlaying) {
      setThumbnailTime(videoRef.current.currentTime)
      previewRef.current.currentTime = videoRef.current.currentTime
    }
  }

  const handleSliderChange = (value: number[]) => {
    const time = value[0]
    setThumbnailTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
    if (previewRef.current) {
      previewRef.current.currentTime = time
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Video Player */}
        <div className="relative">
          <AspectRatio
            ratio={9 / 16}
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
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
            </div>
          </AspectRatio>
        </div>

        {/* Thumbnail Preview */}
        <div className="flex flex-col">
          <p className="text-sm font-medium mb-2">Preview Thumbnail</p>
          <AspectRatio
            ratio={9 / 16}
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

      {/* Time Slider */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Select Thumbnail Time</p>
        <Slider
          value={[thumbnailTime]}
          min={0}
          max={duration}
          step={0.001}
          onValueChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(thumbnailTime)}</span>
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
