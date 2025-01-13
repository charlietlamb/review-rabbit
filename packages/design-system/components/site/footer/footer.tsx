'use client'

import { footerSections } from './footer-data'
import { FooterSocial } from './footer-social'
import { FooterLinks } from './footer-links'
import { Logo } from '../header/logo'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="container relative py-16 sm:py-24"
      >
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6"
        >
          {/* Logo and Social Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-8 lg:col-span-2"
          >
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground max-w-xs">
                Helping businesses grow through authentic customer reviews and
                smart automation.
              </p>
            </div>
            <FooterSocial />
          </motion.div>

          {/* Links Sections */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-3 lg:col-span-4"
          >
            {footerSections.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="flex flex-col gap-4"
              >
                <FooterLinks section={section} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border/40 pt-8 sm:items-center sm:flex-row"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Review Rabbit. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
