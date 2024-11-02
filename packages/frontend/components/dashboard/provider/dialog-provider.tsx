'use client'

import { useEffect, useState } from 'react'

import EditAccountDialog from '../dialogs/editAccount/edit-account-dialog'

export default function DialogProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <EditAccountDialog />
    </>
  )
}
