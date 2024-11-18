'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ReactPlayer from 'react-player'
import { getPresignedUrl } from '@/actions/s3/upload/get-presigned-url'
import PageLoading from './page-loading'
import { cn } from '@/lib/utils'

export default function VideoPlayer({ media }: { media: Media }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [src, setSrc] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer>(null)
  const bufferTimeoutRef = useRef<NodeJS.Timeout>(null)

  // Load video source
  useEffect(() => {
    async function loadVideo() {
      if (!media) return

      try {
        setIsLoading(true)
        setError(null)

        const presignedUrl = await getPresignedUrl(
          `media/${media.id}.${media.extension}`
        )

        if (!presignedUrl) {
          throw new Error('Failed to get video URL')
        }

        setSrc(presignedUrl)
      } catch (error) {
        console.error('Error loading video:', error)
        setError(error instanceof Error ? error.message : 'Error loading video')
      } finally {
        setIsLoading(false)
      }
    }

    loadVideo()
  }, [media])

  // Cleanup buffer timeout
  useEffect(() => {
    return () => {
      if (bufferTimeoutRef.current) {
        clearTimeout(bufferTimeoutRef.current)
      }
    }
  }, [])

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

  const handleBuffer = useCallback(() => {
    // Clear any existing timeout
    if (bufferTimeoutRef.current) {
      clearTimeout(bufferTimeoutRef.current)
    }

    setIsBuffering(true)

    // Set a timeout to prevent quick flashing of loading state
    bufferTimeoutRef.current = setTimeout(() => {
      setIsLoading(true)
    }, 1000)
  }, [])

  const handleBufferEnd = useCallback(() => {
    // Clear the timeout if buffering ends before it triggers
    if (bufferTimeoutRef.current) {
      clearTimeout(bufferTimeoutRef.current)
    }
    setIsBuffering(false)
    setIsLoading(false)
  }, [])

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-background rounded-lg shadow-md text-red-500">
        Error: {error}
      </div>
    )
  }

  if (!src) return <PageLoading />

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full max-w-4xl mx-auto bg-background rounded-lg shadow-md overflow-hidden',
        isFullscreen && 'fixed inset-0 max-w-none z-50'
      )}
    >
      <div className="relative aspect-video bg-black group border border-border">
        <ReactPlayer
          ref={playerRef}
          url={src}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={true}
          playsinline
          pip
          stopOnUnmount={false}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                disablePictureInPicture: false,
              },
              forceVideo: true,
            },
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onBuffer={handleBuffer}
          onBufferEnd={handleBufferEnd}
          onError={(e) => setError(String(e))}
          onReady={() => {
            setIsLoading(false)
            setIsBuffering(false)
            if (bufferTimeoutRef.current) {
              clearTimeout(bufferTimeoutRef.current)
            }
          }}
          progressInterval={500}
        />
        {isLoading && !isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <PageLoading />
          </div>
        )}
        <button
          onClick={handleFullscreenToggle}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isFullscreen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20H5a2 2 0 01-2-2v-4m14 6h4a2 2 0 002-2v-4M5 4h4a2 2 0 012 2v4M19 4h-4a2 2 0 00-2 2v4"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-5V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            )}
          </svg>
        </button>
      </div>
    </div>
  )
}
