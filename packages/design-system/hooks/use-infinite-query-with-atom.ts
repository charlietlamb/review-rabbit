import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { PrimitiveAtom } from 'jotai'
import { useDebounce } from '@burse/design-system/hooks/use-debounce'

interface UseInfiniteQueryProps<T, S> {
  queryKey: string | string[]
  fetchFn: (page: number, search?: string) => Promise<T[]>
  atom: PrimitiveAtom<T[]>
  searchAtom?: PrimitiveAtom<S>
  filterFn?: (item: T, search: string) => boolean
}

export function useInfiniteQueryWithAtom<T, S extends string>({
  queryKey,
  fetchFn,
  atom,
  searchAtom,
  filterFn,
}: UseInfiniteQueryProps<T, S>) {
  const [items, setItems] = useAtom(atom)
  const [search, setSearch] = searchAtom
    ? useAtom(searchAtom)
    : [undefined, undefined]
  const [debouncedSearch] = useDebounce(search, 300)
  const isInitialMount = useRef(true)

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading: isInitialLoading,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKey, debouncedSearch],
    queryFn: ({ pageParam }) => fetchFn(pageParam, debouncedSearch),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length : undefined,
  })

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const allItems = data?.pages.flatMap((page) => page) ?? []

    if (debouncedSearch && filterFn) {
      const filteredItems = allItems.filter((item) =>
        filterFn(item, debouncedSearch)
      )
      setItems(filteredItems)
    } else {
      setItems(allItems)
    }
  }, [data, debouncedSearch])

  return {
    items,
    search,
    setSearch,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading: isInitialLoading,
    isFetching,
    refetch,
  }
}
