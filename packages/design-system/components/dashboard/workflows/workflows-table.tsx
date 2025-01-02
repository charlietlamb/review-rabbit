'use client'

import { workflowsSearchAtom } from '@rabbit/design-system/atoms/dashboard/workflows/workflows-atoms'
import { workflowsAtoms } from '@rabbit/design-system/atoms/dashboard/workflows/workflows-atoms'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
//import { fetchWorkflows } from '@rabbit/database/queries/workflows'

export default function WorkflowsTable() {
  const {
    items: clients,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.WORKFLOWS,
    fetchFn: (page, search) => {},
    atom: workflowsAtoms,
    searchAtom: workflowsSearchAtom,
    filterFn: (workflow, search) =>
      workflow.name.toLowerCase().includes(search.toLowerCase()),
  })
  return <div>workflows-table</div>
}
