'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@ff/design-system/components/ui/button'
import { Slider } from '@ff/design-system/components/ui/slider'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { getPresignedUrl } from '@ff/design-system/actions/s3/upload/get-presigned-url'
import PageLoading from './page-loading'

export default function AudioPlayer({ media }: { media: Media }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(isPlaying)

  // Update isPlaying ref when state changes
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.preload = 'metadata'

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
    }
  }, [])

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoadedMetadata = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
      setIsLoading(false)
    }

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(audio.duration)
    }

    const onPlay = () => {
      setIsPlaying(true)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    const onError = () => {
      console.error('Audio error:', audio.error)
      setError(audio.error?.message || 'Error loading audio')
      setIsPlaying(false)
      setIsLoading(false)
    }

    const onLoadStart = () => {
      setIsLoading(true)
      setError(null)
    }

    const onCanPlay = () => {
      setIsLoading(false)
    }

    audio.addEventListener('loadstart', onLoadStart)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    audio.addEventListener('canplay', onCanPlay)

    return () => {
      audio.removeEventListener('loadstart', onLoadStart)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('canplay', onCanPlay)
    }
  }, [])

  // Load audio source
  useEffect(() => {
    async function loadAudio() {
      if (!media) return

      try {
        setIsLoading(true)
        setError(null)

        const presignedUrl = await getPresignedUrl(
          `media/${media.id}.${media.extension}`
        )

        if (!presignedUrl || !audioRef.current) {
          throw new Error('Failed to get audio URL')
        }

        // Reset state
        setIsPlaying(false)
        setCurrentTime(0)

        // Load new source
        audioRef.current.src = presignedUrl
        await audioRef.current.load()
      } catch (error) {
        console.error('Error loading audio:', error)
        setError(error instanceof Error ? error.message : 'Error loading audio')
        setIsLoading(false)
      }
    }

    loadAudio()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [media])

  const handlePlayPause = async () => {
    const audio = audioRef.current
    if (!audio || isLoading) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audio.play()
      }
    } catch (error) {
      console.error('Error playing/pausing audio:', error)
      setIsPlaying(false)
    }
  }

  const handleSkip = (direction: 'forward' | 'backward') => {
    const audio = audioRef.current
    if (!audio || isLoading) return

    const skipAmount = 10
    if (direction === 'forward') {
      audio.currentTime = Math.min(
        audio.currentTime + skipAmount,
        audio.duration
      )
    } else {
      audio.currentTime = Math.max(audio.currentTime - skipAmount, 0)
    }
  }

  const handleSliderChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio || isLoading) return

    const newTime = value[0]
    audio.currentTime = newTime
    setCurrentTime(newTime)

    if (isPlayingRef.current && audio.paused) {
      audio.play().catch(console.error)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0]
    audio.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleMuteToggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-background rounded-lg shadow-md text-red-500">
        Error: {error}
      </div>
    )
  }

  if (isLoading) return <PageLoading />

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-background rounded-lg">
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={handleSliderChange}
          disabled={isLoading}
          className="w-full cursor-pointer"
          thumbClassName="hidden"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center mb-4 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSkip('backward')}
          disabled={isLoading || currentTime <= 0}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayPause}
          disabled={isLoading}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSkip('forward')}
          disabled={isLoading || currentTime >= duration}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMuteToggle}
            disabled={isLoading}
            className="mr-2"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            disabled={isLoading}
            className="w-24"
            thumbClassName="border-0 bg-primary"
          />
        </div>
      </div>
    </div>
  )
}
