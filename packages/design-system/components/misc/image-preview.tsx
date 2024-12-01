'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Media } from '@ff/database/schema/media'
import { getPresignedUrl } from '@ff/design-system/actions/s3/upload/get-presigned-url'
import PageLoading from './page-loading'
import { cn } from '@ff/design-system/lib/utils'
import { Expand, Shrink } from 'lucide-react'
import { Button } from '../ui/button'

export function ImagePreview({ media }: { media: Media }) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [src, setSrc] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load image source
  useEffect(() => {
    async function loadImage() {
      if (!media) return

      try {
        setIsLoading(true)
        setError(null)

        const presignedUrl = await getPresignedUrl(
          `media/${media.id}.${media.extension}`
        )

        if (!presignedUrl) {
          throw new Error('Failed to get image URL')
        }

        setSrc(presignedUrl)
      } catch (error) {
        console.error('Error loading image:', error)
        setError(error instanceof Error ? error.message : 'Error loading image')
      } finally {
        setIsLoading(false)
      }
    }

    loadImage()
  }, [media])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const handleFullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-background rounded-lg text-red-500">
        Error: {error}
      </div>
    )
  }

  if (!src) return <PageLoading />

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full max-w-4xl mx-auto bg-background rounded-lg overflow-hidden',
        isFullscreen && 'fixed inset-0 max-w-none z-50 bg-black'
      )}
    >
      <div
        className={cn(
          'relative aspect-video bg-black group',
          isFullscreen && 'h-screen aspect-auto'
        )}
      >
        {isLoading ? (
          <PageLoading />
        ) : (
          <img
            src={src}
            alt={media.name || 'Preview image'}
            className={cn(
              'w-full h-full object-contain',
              isFullscreen && 'absolute inset-0'
            )}
            onLoad={() => setIsLoading(false)}
          />
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={handleFullscreenToggle}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {isFullscreen ? (
            <Shrink className="h-4 w-4 text-white" />
          ) : (
            <Expand className="h-4 w-4 text-white" />
          )}
        </Button>
      </div>
    </div>
  )
}
