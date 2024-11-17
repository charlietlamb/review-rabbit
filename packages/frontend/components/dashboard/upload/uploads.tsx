import { fetchMedia } from '@/actions/media/fetch-media'
import {
  uploadPagesAtom,
  uploadsAtom,
  uploadsLastUpdatedAtom,
  uploadsLayoutAtom,
} from '@/atoms/dashboard/upload/uploadsAtom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import UploadCard from './card/upload-card'
import PageLoading from '@/components/misc/page-loading'
import PageError from '@/components/misc/page-error'
import { cn } from '@/lib/utils'
import InfiniteScroll from '@/components/misc/infinite-scroll'
import UploadCardPopoverWrap from './card/upload-card-popover-wrap'
import { dubAvailableMediaAtom } from '@/atoms/dashboard/dub/dubAtom'
import PageEmpty from '@/components/misc/page-empty'

export default function Uploads({ dub = false }: { dub?: boolean }) {
  const uploads = useAtomValue(uploadsAtom)
  const availableMedia = useAtomValue(dubAvailableMediaAtom)
  const setUploadPages = useSetAtom(uploadPagesAtom)
  const lastUpdated = useAtomValue(uploadsLastUpdatedAtom)
  const rootRef = useRef<HTMLDivElement>(null)
  const uploadLayout = useAtomValue(uploadsLayoutAtom)
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['uploads'],
    queryFn: ({ pageParam }) => fetchMedia('user', pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length : undefined,
  })
  useEffect(() => {
    setUploadPages(data?.pages ?? [])
  }, [data, setUploadPages])

  useEffect(() => {
    if (lastUpdated) refetch()
  }, [lastUpdated, refetch])

  if (status === 'pending') return <PageLoading />
  if (status === 'error') return <PageError error={error?.message} />
  if (uploads.length === 0) return <PageEmpty />
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-y-auto h-full overflow-x-hidden p-4',
        (dub || uploadLayout === 'list') &&
          'grid-cols-1 md:grid-cols-1 lg:grid-cols-1'
      )}
      ref={rootRef}
    >
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      >
        {dub
          ? availableMedia.map((upload: Media) => (
              <UploadCard dub key={upload.id} upload={upload} />
            ))
          : uploads.map((upload: Media) => (
              <UploadCardPopoverWrap key={upload.id} upload={upload} />
            ))}
      </InfiniteScroll>
    </div>
  )
}
