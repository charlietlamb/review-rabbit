import { motion, AnimatePresence } from 'framer-motion'

export default function TableFooter({
  show,
  children,
}: {
  show: boolean
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="table-footer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 left-0 right-0 p-4 flex items-center z-50 bg-background justify-between"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
