'use client'

import React, { useEffect } from 'react'
import Uploads from './uploads'
import UploadToolbar from './toolbar/upload-toolbar'
import { useSetAtom } from 'jotai'
import { uploadPagesAtom } from '@/atoms/dashboard/upload/uploadsAtom'

export default function Upload({
  initialUploads,
}: {
  initialUploads: Media[]
}) {
  const setUploadPages = useSetAtom(uploadPagesAtom)
  useEffect(() => {
    setUploadPages([initialUploads])
  }, [initialUploads, setUploadPages])

  return (
    <div className="flex flex-col gap-4 overflow-hidden divide-y">
      <UploadToolbar />
      <Uploads />
    </div>
  )
}
