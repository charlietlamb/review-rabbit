'use client'

import { User } from '@rabbit/database/schema/auth/users'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import OnboardingTheme from '../settings/theme/theme'
import { RiGoogleFill } from '@remixicon/react'

const steps = [
  {
    title: 'Welcome to Review Rabbit',
    description: "Let's get you set up with everything you need",
    content: () => (
      <div className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground text-sm">
          We'll guide you through the setup process to get your account ready.
        </p>
      </div>
    ),
  },
  {
    title: 'Choose Your Theme',
    description: 'Select a color theme for your dashboard',
    content: () => (
      <div className="flex flex-col gap-4 w-full">
        <OnboardingTheme showLabel={false} className="w-full" />
        <p className="text-muted-foreground text-sm">
          You can always change this later in your settings.
        </p>
      </div>
    ),
  },
  {
    title: 'Connect Your Google Business Account',
    description:
      'Connect your Google Business account to start tracking your reviews.',
    content: () => (
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-primary/20 rounded-lg p-4 w-full flex justify-center text-xl font-heading font-bold items-center gap-2 hover:bg-primary/50 transition-all duration-300 cursor-pointer hover:scale-105">
          <RiGoogleFill className="size-10" />
          <p>Connect Google Business Account</p>
        </div>
        <p className="text-muted-foreground text-sm">
          You can always connect to more Google Business accounts later.
        </p>
      </div>
    ),
  },
  {
    title: 'Add Your First Location',
    description: 'Add your first location to start tracking your reviews.',
    content: () => <div />,
  },
]

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export default function Onboarding({ user }: { user: User }) {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleComplete = async () => {
    try {
      const response = await fetch('/api/user/complete-onboarding', {
        method: 'POST',
      })
      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-background/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
    >
      <motion.div
        variants={containerVariants}
        className="bg-background rounded-xl shadow-lg w-full max-w-3xl border border-border relative overflow-hidden flex flex-col"
      >
        {/* Header Section */}
        <div className="p-8 pb-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`header-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <motion.div className="flex items-center justify-between">
                <motion.h1 className="text-2xl font-bold font-heading">
                  {steps[currentStep].title}
                </motion.h1>
                <motion.div
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Step {currentStep + 1} of {steps.length}
                </motion.div>
              </motion.div>
              <motion.p className="text-sm text-muted-foreground">
                {steps[currentStep].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 min-h-[400px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`content-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col items-center justify-center w-full max-w-xl"
            >
              <motion.div
                variants={childVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 w-full flex items-center justify-center"
              >
                {steps[currentStep].content()}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Section */}
        <div className="px-8 py-6 border-t border-border">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              variant="shine"
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleComplete()
                } else {
                  setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
                }
              }}
              className="gap-2"
            >
              {currentStep === steps.length - 1 ? (
                'Get Started'
              ) : (
                <>
                  Continue
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary"
          initial={{ width: '0%' }}
          animate={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}
