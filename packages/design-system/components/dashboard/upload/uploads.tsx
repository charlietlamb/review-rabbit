import { fetchMedia } from '@dubble/design-system/actions/media/fetch-media'
import {
  uploadPagesAtom,
  uploadsAtom,
  uploadsLastUpdatedAtom,
  uploadsLayoutAtom,
} from '@dubble/design-system/atoms/dashboard/upload/uploadsAtom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import UploadCard from './card/upload-card'
import PageLoading from '@dubble/design-system/components/misc/page-loading'
import PageError from '@dubble/design-system/components/misc/page-error'
import { cn } from '@dubble/design-system/lib/utils'
import InfiniteScroll from '@dubble/design-system/components/misc/infinite-scroll'
import UploadCardPopoverWrap from './card/upload-card-dialog'
import {
  dubAvailableMediaAtom,
  dubSelectedMediaAtom,
} from '@dubble/design-system/atoms/dashboard/dub/dubAtom'
import PageEmpty from '@dubble/design-system/components/misc/page-empty'
import UploadsPageEmpty from './uploads-page-empty'
import UploadCardDialog from './card/upload-card-dialog'

export default function Uploads({ dub = false }: { dub?: boolean }) {
  const uploads = useAtomValue(uploadsAtom)
  const availableMedia = useAtomValue(dubAvailableMediaAtom)
  const setUploadPages = useSetAtom(uploadPagesAtom)
  const lastUpdated = useAtomValue(uploadsLastUpdatedAtom)
  const rootRef = useRef<HTMLDivElement>(null)
  const uploadLayout = useAtomValue(uploadsLayoutAtom)
  const [dubSelectedMedia, setDubSelectedMedia] = useAtom(dubSelectedMediaAtom)

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

  function handleSelect(upload: Media) {
    if (dubSelectedMedia.some((m) => m.id === upload.id))
      setDubSelectedMedia(dubSelectedMedia.filter((m) => m.id !== upload.id))
    else setDubSelectedMedia([...(dubSelectedMedia ?? []), upload])
  }

  if (status === 'pending') return <PageLoading />
  if (status === 'error') return <PageError error={error?.message} />
  if (uploads.length === 0) return <UploadsPageEmpty />

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
              <UploadCard
                onSelect={() => handleSelect(upload)}
                key={upload.id}
                upload={upload}
              />
            ))
          : uploads.map((upload: Media) => (
              <UploadCardDialog key={upload.id} upload={upload} />
            ))}
      </InfiniteScroll>
    </div>
  )
}
