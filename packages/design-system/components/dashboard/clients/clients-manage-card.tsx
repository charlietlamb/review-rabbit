import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rabbit/design-system/components/ui/card'
import { motion, useAnimation, Variants } from 'motion/react'
import {
  cardClassName,
  cardContentClassName,
  cardDescriptionClassName,
  cardHeaderClassName,
  cardIconClassName,
  cardTitleClassName,
} from '@rabbit/design-system/data/card-class-names'
import { useRouter } from 'next/navigation'

const pathVariants: Variants = {
  normal: {
    translateX: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 13,
    },
  },
  animate: {
    translateX: [-6, 0],
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 200,
      damping: 13,
    },
  },
}

export default function ClientsManageCard() {
  const controls = useAnimation()
  const router = useRouter()
  return (
    <Card
      className={cardClassName}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      onClick={() => router.push('/dashboard/clients/manage')}
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <motion.path
            d="M22 21v-2a4 4 0 0 0-3-3.87"
            variants={pathVariants}
            animate={controls}
          />
          <motion.path
            d="M16 3.13a4 4 0 0 1 0 7.75"
            variants={pathVariants}
            animate={controls}
          />
        </svg>
      </CardHeader>
      <CardContent className={cardContentClassName}>
        <CardTitle className={cardTitleClassName}>Manage Clients</CardTitle>
        <CardDescription className={cardDescriptionClassName}>
          Add, edit or remove clients from your account.
        </CardDescription>
      </CardContent>
    </Card>
  )
}
