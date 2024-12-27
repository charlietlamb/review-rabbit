'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import Uploads from './uploads'
import Toolbar from '@burse/design-system/components/misc/toolbar/toolbar'
import { useAtom, useSetAtom } from 'jotai'
import {
  uploadPagesAtom,
  uploadsLayoutAtom,
  uploadsSearchAtom,
  uploadsSortAtom,
} from '@burse/design-system/atoms/dashboard/upload/uploads-atom'
import { Media } from '@burse/database/schema/media'
import { UploadDialog } from './upload-dialog'

export default function Upload({
  initialUploads,
}: {
  initialUploads: Media[]
}) {
  const setUploadPages = useSetAtom(uploadPagesAtom)
  useEffect(() => {
    setUploadPages([initialUploads])
  }, [initialUploads, setUploadPages])
  const [search, setSearch] = useAtom(uploadsSearchAtom)
  const [sort, setSort] = useAtom(uploadsSortAtom)
  const [layout, setLayout] = useAtom(uploadsLayoutAtom)
  const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Smallest', value: 'smallest' },
    { label: 'Largest', value: 'largest' },
    { label: 'Type', value: 'type' },
  ]

  return (
    <div className="flex flex-col gap-4 overflow-hidden divide-y">
      <Toolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort as Dispatch<SetStateAction<string>>}
        sortOptions={sortOptions}
        layout={layout}
        setLayout={setLayout as Dispatch<SetStateAction<string>>}
        button={<UploadDialog />}
      />
      <Uploads />
    </div>
  )
}
