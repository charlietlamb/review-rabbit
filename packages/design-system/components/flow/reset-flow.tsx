import { Button } from '@rabbit/design-system/components/ui/button'
import { useSetAtom } from 'jotai'
import { nodesAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'
import { initialNodes } from '@rabbit/design-system/components/flow/lib/flow-data'
import { RotateCcw } from 'lucide-react'
import DangerDialog from '@rabbit/design-system/components/misc/danger-dialog'
import { toast } from 'sonner'

export default function ResetFlow() {
  const setNodes = useSetAtom(nodesAtom)
  return (
    <DangerDialog
      title="Reset Flow"
      description="Are you sure you want to reset the flow?"
      onClick={() => {
        setNodes(initialNodes)
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
