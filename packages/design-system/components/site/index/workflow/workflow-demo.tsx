'use client'

import { Input } from '@rabbit/design-system/components/ui/input'
import { Button } from '@rabbit/design-system/components/ui/button'
import Flow from '@rabbit/design-system/components/flow/flow'
import { ReactFlowProvider } from '@xyflow/react'
import { Mail, Send } from 'lucide-react'
import { useState } from 'react'
import Balancer from 'react-wrap-balancer'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@rabbit/design-system/components/ui/tooltip'
import { cn } from '@rabbit/design-system/lib/utils'
import { motion } from 'framer-motion'
import { triggerDemoAutomation } from '@rabbit/design-system/actions/automations/trigger-demo-automation'
import { workflow } from './workflow-demo-data'
import { manageNodesAtom } from '@rabbit/design-system/atoms/flow/flow-atoms'
import { useAtom } from 'jotai'
import getWorkflowData from '@rabbit/design-system/components/flow/lib/get-workflow-data'

export function WorkflowDemo() {
  const [email, setEmail] = useState('')
  const [manageNodes, setManageNodes] = useAtom(manageNodesAtom)

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-background" />
      <div className="absolute inset-y-0 right-0 -z-10 w-[50%] bg-gradient-to-l from-background to-transparent" />

      <div className="container relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold uppercase text-primary text-center"
          >
            Easy Automations
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Balancer>
              <h2 className="font-heading bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl xl:text-6xl">
                Automate Your Review Collection Process
              </h2>
            </Balancer>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground sm:text-xl"
          >
            Create smart review collection workflows that automatically engage
            your customers at the perfect moment. Watch as your positive reviews
            grow while you focus on running your business.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="overflow-hidden rounded-xl border bg-background/50 shadow-xl backdrop-blur-sm">
            <ReactFlowProvider>
              <div className="h-[500px]">
                <Flow workflow={workflow} />
              </div>
            </ReactFlowProvider>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            This is a limited demo workflow. Log in to create your own custom
            workflows.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-24 max-w-3xl"
        >
          <div className="flex flex-col items-center gap-8 rounded-2xl border bg-background/50 p-8 shadow-lg backdrop-blur-sm sm:p-12">
            <div className="flex items-center gap-6">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/20 sm:size-20">
                <Mail className="size-8 text-primary sm:size-10" />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <h3 className="font-heading text-2xl font-bold sm:text-3xl">
                  Try for yourself
                </h3>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Enter your email to try out the welcome flow you created.
                </p>
              </div>
            </div>

            <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email to try it out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'h-12 text-base shadow-sm transition-all',
                  'focus:ring-2 focus:ring-primary/20',
                  'placeholder:text-muted-foreground/60'
                )}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="shine"
                    size="lg"
                    onClick={() =>
                      triggerDemoAutomation(email, {
                        title: 'Demo Workflow',
                        items: getWorkflowData(manageNodes).items.map(
                          (item) => ({
                            ...item,
                            subject: 'Welcome to Review Rabbit! 🐰',
                          })
                        ),
                      })
                    }
                    className="gap-2 text-base font-medium shadow-sm"
                  >
                    Try it now
                    <Send className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Try Welcome Flow</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
