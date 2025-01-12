'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@rabbit/design-system/components/ui/tabs'
import {
  ScrollArea,
  ScrollBar,
} from '@rabbit/design-system/components/ui/scroll-area'
import { Input } from '@rabbit/design-system/components/ui/input'
import { Button } from '@rabbit/design-system/components/ui/button'
import Flow from '@rabbit/design-system/components/flow/flow'
import { ReactFlowProvider } from '@xyflow/react'
import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
import { MessageSquare, Clock, Users, Play } from 'lucide-react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rabbit/design-system/components/ui/tooltip'

const demoWorkflows: Record<string, WorkflowWithItems> = {
  onboarding: {
    id: 'demo-onboarding',
    title: 'Customer Onboarding',
    userId: 'demo',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: '1',
        type: 'init',
        content: '',
        subject: '',
        method: 'init',
        x: 0,
        y: 0,
        time: 0,
        level: 1,
        workflowId: 'demo-onboarding',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a167f4ee-5655-43be-b925-3959f3e9e7d8',
        type: 'message',
        content:
          "Hey!\n\nWelcome to Review Rabbit - we can't wait to finally give your business the recognition it deserves!\n\nBest,\nCharlie",
        subject: 'Welcome to Review Rabbit!',
        method: 'email',
        x: 0,
        y: 200,
        time: 0,
        level: 2,
        workflowId: 'demo-onboarding',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  feedback: {
    id: 'demo-feedback',
    title: 'Feedback Collection',
    userId: 'demo',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: 'init',
        type: 'init',
        content: '',
        subject: '',
        method: 'init',
        x: 100,
        y: 100,
        time: 0,
        level: 0,
        workflowId: 'demo-feedback',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'request',
        type: 'message',
        content: "We'd love to hear your thoughts on our service...",
        subject: 'Share your feedback',
        method: 'email',
        x: 100,
        y: 200,
        time: 0,
        level: 1,
        workflowId: 'demo-feedback',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'reminder',
        type: 'message',
        content: "Don't forget to share your valuable feedback!",
        subject: 'Quick reminder',
        method: 'email',
        x: 100,
        y: 300,
        time: 0,
        level: 2,
        workflowId: 'demo-feedback',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'wait1',
        type: 'time',
        content: '',
        subject: '',
        method: 'time',
        x: 100,
        y: 400,
        time: 120,
        level: 3,
        workflowId: 'demo-feedback',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  retention: {
    id: 'demo-retention',
    title: 'Customer Retention',
    userId: 'demo',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: 'init',
        type: 'init',
        content: '',
        subject: '',
        method: 'init',
        x: 100,
        y: 100,
        time: 0,
        level: 0,
        workflowId: 'demo-retention',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'inactive',
        type: 'message',
        content: "We noticed you haven't used our service recently...",
        subject: 'We miss you!',
        method: 'email',
        x: 100,
        y: 200,
        time: 0,
        level: 1,
        workflowId: 'demo-retention',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'offer',
        type: 'message',
        content: 'Special offer just for you: 20% off your next purchase!',
        subject: 'Special Offer Inside',
        method: 'email',
        x: 100,
        y: 300,
        time: 0,
        level: 2,
        workflowId: 'demo-retention',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'wait1',
        type: 'time',
        content: '',
        subject: '',
        method: 'time',
        x: 100,
        y: 400,
        time: 48,
        level: 3,
        workflowId: 'demo-retention',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
}

export function WorkflowDemo() {
  const [email, setEmail] = useState('')

  const handleTrigger = () => {
    // In a real implementation, this would trigger the workflow
    console.log('Triggering workflow for:', email)
  }

  return (
    <div className="w-full py-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold">Powerful Workflow Automation</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Build sophisticated customer engagement flows with our visual workflow
          builder. From onboarding to retention, automate your customer
          communications with ease.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="onboarding" className="w-full">
          <div className="flex items-end justify-between bg-background">
            <TabsList className="w-fit bg-transparent justify-start h-8 pb-0 pl-0">
              <TabsTrigger
                value="onboarding"
                className="rounded-none border-x border-t data-[state=active]:bg-background"
              >
                <Users
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Onboarding Flow
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="rounded-none border-x border-t data-[state=active]:bg-background"
              >
                <MessageSquare
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Feedback Flow
              </TabsTrigger>
              <TabsTrigger
                value="retention"
                className="rounded-none border-x border-t data-[state=active]:bg-background"
              >
                <Clock
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Retention Flow
              </TabsTrigger>
            </TabsList>

            <div className="relative w-[300px] h-fit flex items-end">
              <Input
                type="email"
                placeholder="Enter email to test workflow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-0 rounded-b-none pr-10"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleTrigger}
                      disabled={!email}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Trigger Workflow</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {Object.entries(demoWorkflows).map(([key, workflow]) => (
            <TabsContent
              key={key}
              value={key}
              className="border rounded-b-lg mt-0"
            >
              <div className="bg-background">
                <ReactFlowProvider>
                  <div className="h-[500px]">
                    <Flow workflow={workflow} />
                  </div>
                </ReactFlowProvider>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
