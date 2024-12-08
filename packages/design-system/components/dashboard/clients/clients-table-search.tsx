'use client'

import { Input } from '@remio/design-system/components/ui/input'
import { LoaderCircle, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { clientsSearchAtoms } from '@remio/design-system/atoms/dashboard/clients/clients-atoms'

export default function ClientsTableSearch() {
  const [search, setSearch] = useAtom(clientsSearchAtoms)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (search) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setIsLoading(false)
    }
  }, [search])

  return (
    <div className="relative flex-grow">
      <Input
        id="search"
        className="peer pe-9 ps-9"
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        {isLoading ? (
          <LoaderCircle
            className="animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            role="presentation"
          />
        ) : (
          <Search size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </div>
    </div>
  )
}
