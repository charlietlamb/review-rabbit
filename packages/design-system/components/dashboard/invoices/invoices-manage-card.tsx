import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@remio/design-system/components/ui/card'
import { motion, useAnimation, Variants } from 'motion/react'
import {
  cardClassName,
  cardContentClassName,
  cardDescriptionClassName,
  cardHeaderClassName,
  cardIconClassName,
  cardTitleClassName,
} from '@remio/design-system/data/card-class-names'
import { useRouter } from 'next/navigation'

const dollarMainVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
    },
  },
}

const dollarSecondaryVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      delay: 0.5,
      duration: 0.4,
      opacity: { duration: 0.1, delay: 0.5 },
    },
  },
}

export default function InvoicesManageCard() {
  const controls = useAnimation()
  const router = useRouter()
  return (
    <Card
      className={cardClassName}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      onClick={() => router.push('/dashboard/payments/manage')}
    >
      <CardHeader className={cardHeaderClassName}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cardIconClassName}
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"
            initial="normal"
            animate={controls}
            variants={dollarMainVariants}
          />
          <motion.path
            d="M12 18V6"
            initial="normal"
            animate={controls}
            variants={dollarSecondaryVariants}
          />
        </svg>
      </CardHeader>
      <CardContent className={cardContentClassName}>
        <CardTitle className={cardTitleClassName}>Manage Invoices</CardTitle>
        <CardDescription className={cardDescriptionClassName}>
          View previous invoices and create new ones.
        </CardDescription>
      </CardContent>
    </Card>
  )
}
