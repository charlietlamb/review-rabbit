'use client'

import { useEffect, useState } from 'react'

import EditAccountDialog from '../dialogs/editAccount/EditAccountDialog'

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
