'use client'

import { User } from '@burse/database/schema/users'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@burse/design-system/components/ui/button'
import { useState } from 'react'
import { ArrowRight, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import OnboardingTheme from '../settings/theme/theme'
import OnboardingStripe from './oboarding-stripe'

const steps = [
  {
    title: 'Welcome to Burse',
    description: "Let's get you set up with everything you need",
    content: () => (
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-muted-foreground">
          We'll guide you through the setup process to get your account ready.
        </p>
      </div>
    ),
  },
  {
    title: 'Choose Your Theme',
    description: 'Select a color theme for your dashboard',
    content: () => (
      <div className="flex flex-col gap-4">
        <OnboardingTheme />
        <p className="text-muted-foreground text-sm">
          You can always change this later in your settings.
        </p>
      </div>
    ),
  },
  {
    title: 'Connect Your Stripe Account',
    description: 'Start accepting payments from your clients',
    content: () => <OnboardingStripe />,
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
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        variants={containerVariants}
        className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md border border-border relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              variants={childVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <motion.div className="flex items-center gap-2">
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

            <motion.div
              variants={childVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {steps[currentStep].content()}

              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={() =>
                    setCurrentStep((prev) => Math.max(0, prev - 1))
                  }
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
                      setCurrentStep((prev) =>
                        Math.min(steps.length - 1, prev + 1)
                      )
                    }
                  }}
                  className="gap-2"
                >
                  {currentStep === steps.length - 1 ? (
                    'Get Started'
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-primary"
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
