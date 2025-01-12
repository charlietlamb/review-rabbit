'use client'

import { Button } from '@rabbit/design-system/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
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

const checkmarkVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="container relative flex flex-col items-center gap-8 py-24 sm:py-32"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-primary font-bold text-center uppercase"
          >
            Boost Your Reviews
          </motion.span>
          <Balancer>
            <motion.h2
              variants={itemVariants}
              className="font-heading max-w-3xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl xl:text-6xl"
            >
              Get More Genuine Reviews, Automatically
            </motion.h2>
          </Balancer>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
        >
          Our smart platform helps you collect authentic reviews from real
          customers at the perfect moment. Watch your review count grow
          naturally, without the hassle.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row mt-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              asChild
              variant="shine"
              className="group relative px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-colors"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                Start Growing Reviews
                <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-muted-foreground"
        >
          <motion.div
            variants={checkmarkVariants}
            className="flex items-center gap-2"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            <span>Automated review requests</span>
          </motion.div>

          <motion.div
            variants={checkmarkVariants}
            className="flex items-center gap-2"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            <span>100% genuine reviews</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
