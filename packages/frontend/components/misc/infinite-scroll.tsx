import React from 'react'

interface InfiniteScrollProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => unknown
  children?: React.ReactNode
}

export default function InfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  children,
}: InfiniteScrollProps) {
  //@ts-ignore
  const observer = React.useRef<IntersectionObserver>()
  const observerRef = React.useCallback(
    (element: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect()
      if (!element) return
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage)
          fetchNextPage()
      })
      observer.current.observe(element)
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage]
  )

  return (
    <>
      {children}
      <div ref={observerRef} className="h-px w-full" />
    </>
  )
}
