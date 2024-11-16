import React from 'react'
import Uploads from './uploads'
import UploadToolbar from './toolbar/upload-toolbar'

export default function Upload() {
  return (
    <div className="flex flex-col">
      <UploadToolbar />
      <Uploads />
    </div>
  )
}
