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
import { AspectRatio } from '@ff/design-system/components/ui/aspect-ratio'
import { getPresignedUrl } from '@ff/design-system/actions/s3/upload/get-presigned-url'
import CreateFormAudioPreview from '../../form/audio/create-form-audio-preview'
import CreateFormPreviewDelete from '../delete/create-form-preview-delete'
import CreateFormPreviewThumbnail from '../thumbnail/create-form-preview-thumbnail'
import CreatePreviewShortsFooter from '../footer/create-preview-shorts-footer'

interface CreatePreviewShortsProps {
  media?: File | Media | null
  className?: string
}

export function CreatePreviewShorts({
  media: propMedia,
  className,
}: CreatePreviewShortsProps) {
  const [files, setFiles] = useAtom(createFilesAtom)
  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isReady, setIsReady] = useState(false)
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
    playerRef.current?.seekTo(time)
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

  if (!createPreviewUrls.length) {
    return (
      <div className="w-full flex justify-center">
        <AspectRatio
          ratio={9 / 16}
          className={cn('relative w-full bg-muted rounded-lg', className)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">No video selected</p>
          </div>
          <CreateFormAudioPreview />
        </AspectRatio>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 justify-center group rounded-lg overflow-hidden">
      <AspectRatio
        ratio={9 / 16}
        ref={containerRef}
        className={cn('relative w-full', className)}
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden bg-black">
          <ReactPlayer
            ref={playerRef}
            url={createPreviewUrls[0]}
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
            <CreateFormAudioPreview />
            <CreateFormPreviewDelete handleDelete={handleDelete} />
            <CreatePreviewShortsFooter />
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

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent rounded-b-lg">
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={0.001}
                  onValueChange={handleSeek}
                  thumbClassName="hidden"
                  className="cursor-pointer"
                  trackClassName="bg-border"
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

      <CreateFormPreviewThumbnail url={createPreviewUrls[0]} mobile />
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
