import { Node, NodeProps, Handle, Position } from '@xyflow/react'
import { BaseNode } from '@dubble/design-system/components/react-flow/base-node'
import { SocialPlatformData } from '@dubble/design-system/lib/socials'
import { cn } from '@dubble/design-system/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@dubble/design-system/components/ui/sheet'
export type SocialNodeType = Node<{
  platform: SocialPlatformData
}>

export function SocialNode({ data, selected }: NodeProps<SocialNodeType>) {
  return (
    <Sheet>
      <BaseNode
        selected={selected}
        className="bg-background flex flex-col overflow-hidden"
      >
        <SheetTrigger asChild>
          <div
            className={cn(
              'text-background font-heading p-2 py-0 flex items-center gap-2 cursor-pointer',
              data.platform.className
            )}
          >
            {data.platform.icon}
            {data.platform.name}
          </div>
        </SheetTrigger>
        <div className="text-muted-foreground text-xs p-2">info</div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </BaseNode>
      <SheetContent>
        <SheetTitle className="sr-only">{data.platform.name}</SheetTitle>
      </SheetContent>
    </Sheet>
  )
}
