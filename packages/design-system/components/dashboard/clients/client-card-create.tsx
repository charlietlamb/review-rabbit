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
} from './client-card-class-names'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@remio/design-system/components/ui/dialog'
import { useState } from 'react'
import ClientsNewForm from './clients-form'
import { useRouter } from 'next/navigation'

const penVariants: Variants = {
  normal: {
    rotate: 0,
    x: 0,
    y: 0,
  },
  animate: {
    rotate: [-0.5, 0.5, -0.5],
    x: [0, -1, 1.5, 0],
    y: [0, 1.5, -1, 0],
  },
}

export default function ClientsManageCard() {
  const controls = useAnimation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card
          className={cardClassName}
          onMouseEnter={() => controls.start('animate')}
          onMouseLeave={() => controls.start('normal')}
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
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <motion.path
                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                variants={penVariants}
                animate={controls}
                transition={{
                  duration: 0.5,
                  repeat: 1,
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </CardHeader>
          <CardContent className={cardContentClassName}>
            <CardTitle className={cardTitleClassName}>Add New Client</CardTitle>
            <CardDescription className={cardDescriptionClassName}>
              Add a new client to your account.
            </CardDescription>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add a new client to your account.</DialogDescription>
        <ClientsNewForm
          setIsOpen={setIsOpen}
          onSuccess={() => {
            setIsOpen(false)
            router.push('/dashboard/clients/manage')
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
