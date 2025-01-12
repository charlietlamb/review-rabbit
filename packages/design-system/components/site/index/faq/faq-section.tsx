'use client'

import { Accordion } from '@rabbit/design-system/components/ui/accordion'
import { FaqItem } from './faq-item'
import { faqData } from './faq-data'
import Balancer from 'react-wrap-balancer'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const faqContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
}

const faqItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function Faq() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="container relative flex flex-col items-center gap-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-primary font-bold text-center uppercase"
          >
            Common Questions
          </motion.span>
          <Balancer>
            <motion.h2
              variants={itemVariants}
              className="font-heading max-w-2xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
            >
              Frequently Asked Questions
            </motion.h2>
          </Balancer>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
        >
          Everything you need to know about our review management platform.
          Can't find what you're looking for? Reach out to our support team.
        </motion.p>

        <motion.div
          variants={faqContainerVariants}
          className="w-full max-w-3xl"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full mt-8 space-y-4"
            defaultValue="1"
          >
            {faqData.map((item) => (
              <motion.div
                key={item.id}
                variants={faqItemVariants}
                whileHover={{ scale: 1.01 }}
                className="origin-top"
              >
                <FaqItem {...item} />
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  )
}
