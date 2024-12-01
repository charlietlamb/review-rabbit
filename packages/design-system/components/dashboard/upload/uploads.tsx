import { fetchMedia } from '@ff/design-system/actions/media/fetch-media'
import {
  uploadPagesAtom,
  uploadsAtom,
  uploadsLastUpdatedAtom,
  uploadsLayoutAtom,
} from '@ff/design-system/atoms/dashboard/upload/uploads-atom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import UploadCard from './card/upload-card'
import PageLoading from '@ff/design-system/components/misc/page-loading'
import PageError from '@ff/design-system/components/misc/page-error'
import { cn } from '@ff/design-system/lib/utils'
import InfiniteScroll from '@ff/design-system/components/misc/infinite-scroll'
import UploadsPageEmpty from './uploads-page-empty'
import UploadCardDialog from './card/upload-card-dialog'
import { Media } from '@ff/database/schema/media'
import { Dispatch, SetStateAction } from 'react'
export default function Uploads({
  select = false,
  selected,
  setSelected,
  maxFileCount,
  accept,
}: {
  select?: boolean
  selected?: Media[]
  setSelected?: Dispatch<SetStateAction<Media[]>>
  maxFileCount?: number
  accept?: string[]
}) {
  const uploads = useAtomValue(uploadsAtom)
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

  function handleSelect(upload: Media) {
    if (selected?.some((m) => m.id === upload.id))
      setSelected?.(selected?.filter((m) => m.id !== upload.id))
    else {
      if (maxFileCount && selected && selected?.length >= maxFileCount) return
      setSelected?.([...(selected ?? []), upload])
    }
  }

  if (status === 'pending') return <PageLoading />
  if (status === 'error') return <PageError error={error?.message} />
  if (uploads.length === 0) return <UploadsPageEmpty />

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-y-auto h-full overflow-x-hidden p-4',
        (select || uploadLayout === 'list') &&
          'grid-cols-1 md:grid-cols-1 lg:grid-cols-1'
      )}
      ref={rootRef}
    >
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      >
        {select
          ? uploads
              .filter((upload: Media) =>
                accept ? accept.includes(upload.mimeType.split('/')[0]) : true
              )
              .map((upload: Media) => (
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
