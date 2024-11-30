'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Button } from '@dubble/design-system/components/ui/button'
import { Slider } from '@dubble/design-system/components/ui/slider'
import { Play, Pause } from 'lucide-react'
import { cn } from '@dubble/design-system/lib/utils'
import { media, Media } from '@dubble/database/schema/media'
import { useAtomValue } from 'jotai'
import ReactPlayer from 'react-player'
import {
  createFilesAtom,
  createMediaAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import debounce from 'lodash/debounce'
import { AspectRatio } from '@dubble/design-system/components/ui/aspect-ratio'
import { getPresignedUrl } from '@dubble/design-system/actions/s3/upload/get-presigned-url'

interface CreatePreviewShortsProps {
  media?: File | Media | null
  onThumbnailSelect?: (time: number) => void
  className?: string
}

export function CreatePreviewShorts({
  media: propMedia,
  onThumbnailSelect,
  className,
}: CreatePreviewShortsProps) {
  const files = useAtomValue(createFilesAtom)
  const mediaItems = useAtomValue(createMediaAtom)
  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVideoUrl() {
      const media = propMedia ?? files[0] ?? mediaItems[0] ?? null
      if (!media) return
      const url =
        media instanceof File
          ? URL.createObjectURL(media)
          : await getPresignedUrl(`media/${media.id}.${media.extension}`)
      setVideoUrl(url)
    }
    fetchVideoUrl()
  }, [propMedia, files, mediaItems])

  useEffect(() => {
    if (!videoUrl) return
    async function cleanup() {
      setIsPlaying(false)
      setCurrentTime(0)
      setIsReady(false)

      const objectUrl = await videoUrl
      return () => {
        if (objectUrl && objectUrl.startsWith('blob:')) {
          URL.revokeObjectURL(objectUrl)
        }
      }
    }
    cleanup()
  }, [videoUrl])

  const handlePlayPause = () => setIsPlaying(!isPlaying)

  const handleProgress = useCallback(
    ({ playedSeconds }: { playedSeconds: number }) => {
      if (!isPlaying) return
      setCurrentTime(Math.round(playedSeconds * 10) / 10)
    },
    [isPlaying]
  )

  const handleDuration = (duration: number) => {
    setDuration(duration)
    onThumbnailSelect?.(0)
  }

  const debouncedSeek = useMemo(
    () =>
      debounce((time: number) => {
        playerRef.current?.seekTo(time, 'seconds')
        onThumbnailSelect?.(time)
      }, 100),
    [onThumbnailSelect]
  )

  const handleSeek = (value: number[]) => {
    const time = value[0]
    setCurrentTime(time)
    debouncedSeek(time)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    playerRef.current?.seekTo(0)
  }

  if (!media || !videoUrl) {
    return (
      <div className="w-full max-w-[400px] flex justify-center mx-auto">
        <AspectRatio
          ratio={9 / 16}
          className={cn('relative w-full bg-muted rounded-lg', className)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">No video selected</p>
          </div>
        </AspectRatio>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[400px] flex justify-center mx-auto">
      <AspectRatio
        ratio={9 / 16}
        ref={containerRef}
        className={cn('relative w-full', className)}
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden bg-black">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            width="100%"
            height="100%"
            playing={isPlaying}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            onReady={() => setIsReady(true)}
            playsinline
            pip={false}
            controls={false}
            config={{
              file: {
                attributes: {
                  style: {
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  },
                },
              },
            }}
          />
        </div>

        {isReady && (
          <>
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

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  thumbClassName="border-none"
                />
                <div className="flex justify-between text-xs text-white">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </AspectRatio>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
