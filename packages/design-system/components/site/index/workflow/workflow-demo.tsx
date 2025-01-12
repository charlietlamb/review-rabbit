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
import { MessageSquare, Clock, Users, Play, Rocket } from 'lucide-react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rabbit/design-system/components/ui/tooltip'
import Balancer from 'react-wrap-balancer'

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
    <div className="container relative flex flex-col items-center gap-8 py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/05 via-primary/5 to-background pointer-events-none" />
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-primary font-bold text-center uppercase">
            Easy Automations
          </span>
          <Balancer>
            <h2 className="font-heading max-w-3xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl xl:text-6xl">
              Automate Your Review Collection Process
            </h2>
          </Balancer>
        </div>
        <p className="max-w-3xl text-center text-lg text-muted-foreground sm:text-xl">
          Create smart review collection workflows that automatically engage
          your customers at the perfect moment. Watch as your positive reviews
          grow while you focus on running your business.
        </p>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <Tabs defaultValue="onboarding" className="w-full">
          <TabsList className="w-fit bg-transparent justify-start h-10 pb-0 pl-0">
            <TabsTrigger
              value="onboarding"
              className="rounded-none border-x border-t data-[state=active]:bg-background data-[state=active]:border-b-0"
            >
              <Users
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Welcome Flow
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="rounded-none border-x border-t data-[state=active]:bg-background data-[state=active]:border-b-0"
            >
              <MessageSquare
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Review Request
            </TabsTrigger>
            <TabsTrigger
              value="retention"
              className="rounded-none border-x border-t data-[state=active]:bg-background data-[state=active]:border-b-0"
            >
              <Clock
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Follow-up Flow
            </TabsTrigger>
          </TabsList>

          {Object.entries(demoWorkflows).map(([key, workflow]) => (
            <TabsContent
              key={key}
              value={key}
              className="border rounded-b-lg mt-0 shadow-sm"
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

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Input
            type="email"
            placeholder="Enter your email to try it out"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-xs text-base"
          />
          <Button
            variant="shine"
            onClick={handleTrigger}
            className="text-base font-medium flex items-center gap-2  shadow-sm"
          >
            Try Welcome Flow
            <Rocket className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
