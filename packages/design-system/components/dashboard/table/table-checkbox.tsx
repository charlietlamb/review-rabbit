import { Atom, useAtomValue } from 'jotai'
import { Checkbox } from '@rabbit/design-system/components/ui/checkbox'
import { Row } from '@tanstack/react-table'

interface WithId {
  id: string
}

export function getTableCheckboxColumn<T extends WithId>(
  selectedItemsAtom: Atom<T[]>,
  setSelectedItems: (items: T[]) => void
) {
  return {
    accessorKey: 'checkbox',
    header: () => null,
    cell: ({ row }: { row: Row<T> }) => {
      const selectedItems = useAtomValue(selectedItemsAtom)

      return (
        <div className="flex items-center justify-center">
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            checked={selectedItems.some((item) => item.id === row.original.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedItems([...selectedItems, row.original])
              } else {
                setSelectedItems(
                  selectedItems.filter((item) => item.id !== row.original.id)
                )
              }
            }}
          />
        </div>
      )
    },
  }
}
