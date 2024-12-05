'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from '@ff/design-system/components/ui/button'
import { Slider } from '@ff/design-system/components/ui/slider'
import { Play, Pause } from 'lucide-react'
import { cn } from '@ff/design-system/lib/utils'
import { Media } from '@ff/database/schema/media'
import { useAtom } from 'jotai'
import ReactPlayer from 'react-player'
import {
  createFilesAtom,
  createPreviewUrlsAtom,
  createThumbnailTimeAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { getPresignedUrl } from '@ff/design-system/actions/s3/upload/get-presigned-url'
import CreateFormAudioPreview from '../../form/audio/create-form-audio-preview'
import CreateFormPreviewDelete from '../delete/create-form-preview-delete'
import CreateFormPreviewThumbnail from '../thumbnail/create-form-preview-thumbnail'

interface CreatePreviewVideoProps {
  media?: File | Media | null
  className?: string
}

export function CreatePreviewVideo({
  media: propMedia,
  className,
}: CreatePreviewVideoProps) {
  const [files, setFiles] = useAtom(createFilesAtom)
  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [createPreviewUrls, setCreatePreviewUrls] = useAtom(
    createPreviewUrlsAtom
  )
  const [createThumbnailTime, setCreateThumbnailTime] = useAtom(
    createThumbnailTimeAtom
  )

  useEffect(() => {
    async function fetchVideoUrl() {
      const media = propMedia ?? files[0] ?? null
      if (!media) return
      const url =
        media instanceof File
          ? URL.createObjectURL(media)
          : typeof media === 'object' && 'id' in media && 'extension' in media
          ? await getPresignedUrl(`media/${media.id}.${media.extension}`)
          : media
      if (!url) return
      setCreatePreviewUrls([url])
    }
    fetchVideoUrl()
  }, [propMedia, files])

  useEffect(() => {
    if (!createPreviewUrls.length) return
    async function cleanup() {
      setIsPlaying(false)
      setCurrentTime(0)
      setIsReady(false)

      const objectUrl = createPreviewUrls[0]
      return () => {
        if (objectUrl && objectUrl.startsWith('blob:')) {
          URL.revokeObjectURL(objectUrl)
        }
      }
    }
    cleanup()
  }, [createPreviewUrls])

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
  }

  const handleSeek = (value: number[]) => {
    const time = Math.round(value[0] * 1000) / 1000
    setCurrentTime(time)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    playerRef.current?.seekTo(0)
  }

  const handleDelete = () => {
    setFiles([])
    setCreateThumbnailTime(0)
    setCreatePreviewUrls([])
  }

  const handleReady = () => {
    setIsReady(true)
    // Get video dimensions from player
    const player = playerRef.current?.getInternalPlayer() as HTMLVideoElement
    if (player) {
      setDimensions({
        width: player.videoWidth,
        height: player.videoHeight,
      })
    }
  }

  if (!createPreviewUrls.length) {
    return (
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'relative w-full bg-muted rounded-lg min-h-[300px]',
            className
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">No video selected</p>
          </div>
          <CreateFormAudioPreview />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center group flex-col gap-2">
      <div
        ref={containerRef}
        className={cn(
          'relative w-full rounded-lg overflow-hidden bg-black',
          className
        )}
        style={{
          maxWidth: '100%',
          aspectRatio:
            dimensions.width && dimensions.height
              ? `${dimensions.width} / ${dimensions.height}`
              : 'auto',
        }}
      >
        <ReactPlayer
          ref={playerRef}
          url={createPreviewUrls[0]}
          width="100%"
          height="100%"
          playing={isPlaying}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onReady={handleReady}
          playsinline
          pip={false}
          controls={false}
          config={{
            file: {
              attributes: {
                style: {
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                },
              },
            },
          }}
        />

        {isReady && (
          <>
            <CreateFormAudioPreview />
            <CreateFormPreviewDelete handleDelete={handleDelete} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" fill="white" />
                ) : (
                  <Play className="h-6 w-6 ml-1" fill="white" />
                )}
              </Button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={0.001}
                  onValueChange={handleSeek}
                  thumbClassName="hidden"
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <CreateFormPreviewThumbnail
        url={createPreviewUrls[0]}
        className="relative"
      />
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
