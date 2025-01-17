'use client'

import { TestimonialCard } from './testimonial-card'
import { staticTestimonials } from '../../testimonials/testimonial-data'
import Balancer from 'react-wrap-balancer'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-background to-background" />
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
            Customer Stories
          </motion.span>
          <Balancer>
            <motion.h2
              variants={itemVariants}
              className="font-heading max-w-2xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
            >
              Loved by Businesses Worldwide
            </motion.h2>
          </Balancer>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
        >
          Join thousands of businesses who have transformed their online
          presence with authentic customer reviews.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="grid gap-8 pt-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
        >
          {staticTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
              <TestimonialCard {...testimonial} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
