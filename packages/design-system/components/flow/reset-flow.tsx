import { Button } from '@rabbit/design-system/components/ui/button'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  nodesAtom,
  manageNodesAtom,
  isCreateModeAtom,
} from '@rabbit/design-system/atoms/flow/flow-atoms'
import { initialNodes } from '@rabbit/design-system/components/flow/lib/flow-data'
import { RotateCcw } from 'lucide-react'
import DangerDialog from '@rabbit/design-system/components/misc/danger-dialog'
import { toast } from 'sonner'

export default function ResetFlow() {
  const isCreateMode = useAtomValue(isCreateModeAtom)
  const setNodes = useSetAtom(nodesAtom)
  const setManageNodes = useSetAtom(manageNodesAtom)
  return (
    <DangerDialog
      title="Reset Flow"
      description="Are you sure you want to reset the flow?"
      onClick={() => {
        if (isCreateMode) {
          setNodes(initialNodes)
        } else {
          setManageNodes(initialNodes)
        }
        toast('Flow reset', {
          description: 'Flow has been set to initial state',
        })
      }}
    >
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-foreground"
      >
        <RotateCcw className="size-4" />
      </Button>
    </DangerDialog>
  )
}
