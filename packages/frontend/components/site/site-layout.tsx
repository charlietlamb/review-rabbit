import React from 'react'
import { Footer } from '@/components/site/footer/footer'
import { Header } from '@/components/site/header/header'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
