'use client'

import { CompanyLogo } from './company-logo'
import { companies } from './social-proof-data'
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

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function SocialProof() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="container relative flex flex-col items-center gap-12"
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
            Trusted By Leaders
          </motion.span>
          <Balancer>
            <motion.h2
              variants={itemVariants}
              className="font-heading max-w-2xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
            >
              Companies That Trust Us
            </motion.h2>
          </Balancer>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
        >
          Join thousands of successful businesses who use our platform to manage
          their online reputation.
        </motion.p>

        {/* Logos */}
        <div className="w-full max-w-6xl px-4">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 items-center justify-items-center"
          >
            {companies.map((company) => (
              <motion.div
                key={company.src}
                variants={logoVariants}
                className="w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <CompanyLogo src={company.src} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
