'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@ff/design-system/lib/utils'
import { Media } from '@ff/database/schema/media'
import { useAtom, useAtomValue } from 'jotai'
import ReactPlayer from 'react-player'
import {
  createFilesAtom,
  createPreviewUrlsAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { getPresignedUrl } from '@ff/design-system/actions/s3/upload/get-presigned-url'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@ff/design-system/components/ui/carousel'
import { Button } from '@ff/design-system/components/ui/button'
import { X, Play, Pause } from 'lucide-react'
import { CreateFile } from '../../form/types/create-form-types'
import { Slider } from '@ff/design-system/components/ui/slider'

interface MediaItem {
  url: string
  type: 'image' | 'video'
  dimensions: { width: number; height: number }
}

export function CreatePreviewCarousel({ className }: { className?: string }) {
  const [files, setFiles] = useAtom(createFilesAtom)
  const [createPreviewUrls, setCreatePreviewUrls] = useAtom(
    createPreviewUrlsAtom
  )
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [playingStates, setPlayingStates] = useState<Record<number, boolean>>(
    {}
  )
  const playerRefs = useRef<Record<number, ReactPlayer | null>>({})
  const [containerDimensions, setContainerDimensions] = useState<{
    width: number
    height: number
  }>({ width: 16, height: 9 })
  const [durations, setDurations] = useState<Record<number, number>>({})
  const [currentTimes, setCurrentTimes] = useState<Record<number, number>>({})

  useEffect(() => {
    async function processMedia() {
      const mediaArray = files ?? []
      if (!mediaArray.length) {
        setMediaItems([])
        setIsLoading(false)
        return
      }

      const items: MediaItem[] = []
      const urls: string[] = []

      const firstMedia = mediaArray[0]
      const firstUrl =
        firstMedia instanceof File
          ? URL.createObjectURL(firstMedia)
          : typeof firstMedia === 'object' &&
            'id' in firstMedia &&
            'extension' in firstMedia
          ? await getPresignedUrl(
              `media/${firstMedia.id}.${firstMedia.extension}`
            )
          : null

      let firstItemDimensions = { width: 16, height: 9 }

      if (firstUrl) {
        const type = getMediaType(firstMedia)
        if (type === 'image') {
          firstItemDimensions = await getImageDimensions(firstUrl)
        } else {
          firstItemDimensions = { width: 16, height: 9 }
        }
        setContainerDimensions(firstItemDimensions)
        items.push({ url: firstUrl, type, dimensions: firstItemDimensions })
        urls.push(firstUrl)
      }

      for (const media of mediaArray.slice(1)) {
        const url =
          media instanceof File
            ? URL.createObjectURL(media)
            : typeof media === 'object' && 'id' in media && 'extension' in media
            ? await getPresignedUrl(`media/${media.id}.${media.extension}`)
            : null

        if (!url) continue
        const type = getMediaType(media)
        urls.push(url)
        items.push({ url, type, dimensions: firstItemDimensions })
      }

      setCreatePreviewUrls(urls)
      setMediaItems(items)
      setIsLoading(false)
    }

    processMedia()

    return () => {
      createPreviewUrls.forEach((url) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
  }, [files])

  const handleDelete = (index: number) => {
    const newFiles = [...files]
    const newMediaItems = [...mediaItems]
    const newUrls = [...createPreviewUrls]
    const newPlayingStates = { ...playingStates }
    const newDurations = { ...durations }
    const newCurrentTimes = { ...currentTimes }

    if (newUrls[index]?.startsWith('blob:')) {
      URL.revokeObjectURL(newUrls[index])
    }

    newFiles.splice(index, 1)
    newMediaItems.splice(index, 1)
    newUrls.splice(index, 1)

    delete newPlayingStates[index]
    delete newDurations[index]
    delete newCurrentTimes[index]
    delete playerRefs.current[index]

    setFiles(newFiles)
    setMediaItems(newMediaItems)
    setCreatePreviewUrls(newUrls)
    setPlayingStates(newPlayingStates)
    setDurations(newDurations)
    setCurrentTimes(newCurrentTimes)
  }

  const handlePlayPause = (index: number) => {
    setPlayingStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleVideoReady = (index: number, player: ReactPlayer) => {
    playerRefs.current[index] = player
    if (index === 0) {
      const videoElement = player.getInternalPlayer() as HTMLVideoElement
      if (videoElement) {
        const newDimensions = {
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
        }
        setContainerDimensions(newDimensions)
        setMediaItems((prev) =>
          prev.map((item) => ({ ...item, dimensions: newDimensions }))
        )
      }
    }
  }

  const handleProgress = (
    index: number,
    { playedSeconds }: { playedSeconds: number }
  ) => {
    if (!playingStates[index]) return
    setCurrentTimes((prev) => ({
      ...prev,
      [index]: Math.round(playedSeconds * 10) / 10,
    }))
  }

  const handleDuration = (index: number, duration: number) => {
    setDurations((prev) => ({
      ...prev,
      [index]: duration,
    }))
  }

  const handleSeek = (index: number, value: number[]) => {
    const time = Math.round(value[0] * 1000) / 1000
    setCurrentTimes((prev) => ({
      ...prev,
      [index]: time,
    }))
    if (playerRefs.current[index]) {
      playerRefs.current[index]?.seekTo(time)
    }
  }

  if (!mediaItems.length) {
    return (
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'relative w-full bg-muted rounded-lg min-h-[300px]',
            className
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">No media selected</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Carousel
      className={cn('w-full', className)}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {mediaItems.map((item, index) => (
          <CarouselItem key={item.url}>
            <div
              className={cn(
                'relative w-full rounded-lg overflow-hidden bg-black',
                isLoading && 'animate-pulse'
              )}
              style={{
                maxWidth: '100%',
                aspectRatio: `${containerDimensions.width} / ${containerDimensions.height}`,
              }}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              ) : (
                <>
                  <ReactPlayer
                    ref={(player) => {
                      if (player) handleVideoReady(index, player)
                    }}
                    url={item.url}
                    width="100%"
                    height="100%"
                    playing={playingStates[index]}
                    onProgress={(state) => handleProgress(index, state)}
                    onDuration={(duration) => handleDuration(index, duration)}
                    onEnded={() =>
                      setPlayingStates((prev) => ({ ...prev, [index]: false }))
                    }
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white z-10"
                    onClick={() => handlePlayPause(index)}
                  >
                    {playingStates[index] ? (
                      <Pause className="h-6 w-6" fill="white" />
                    ) : (
                      <Play className="h-6 w-6 ml-1" fill="white" />
                    )}
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent z-20">
                    <div className="space-y-2">
                      <Slider
                        value={[currentTimes[index] || 0]}
                        min={0}
                        max={durations[index] || 100}
                        step={0.001}
                        onValueChange={(value) => handleSeek(index, value)}
                        className="cursor-pointer"
                        thumbClassName="hidden"
                      />
                      <div className="flex justify-between text-xs text-white">
                        <span>{formatTime(currentTimes[index] || 0)}</span>
                        <span>{formatTime(durations[index] || 0)}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70 text-white z-30 hover:text-red-500"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {mediaItems.length > 1 && (
        <>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </>
      )}
    </Carousel>
  )
}

function getMediaType(media: CreateFile): 'image' | 'video' {
  if (media instanceof File) {
    return media.type.startsWith('video/') ? 'video' : 'image'
  }
  if (typeof media === 'object' && media !== null && 'extension' in media) {
    return ['mp4', 'mov', 'webm'].includes(media.extension) ? 'video' : 'image'
  }
  // If it's a string, assume it's an image unless it has a video extension
  const ext = media.split('.').pop()?.toLowerCase() || ''
  return ['mp4', 'mov', 'webm'].includes(ext) ? 'video' : 'image'
}

async function getImageDimensions(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.src = url
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }
    img.onerror = () => {
      resolve({ width: 1, height: 1 }) // Fallback dimensions
    }
  })
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.round(seconds % 60)
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
