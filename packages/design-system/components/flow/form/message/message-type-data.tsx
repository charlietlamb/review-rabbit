import { Mail, MessageSquare } from 'lucide-react'
import { MESSAGE_TYPES } from '../../lib/types'
import { RiWhatsappFill } from '@remixicon/react'

export const MESSAGE_TYPE_DATA = {
  [MESSAGE_TYPES.EMAIL]: {
    label: 'Email',
    description: 'Send an email to the user',
    icon: <Mail />,
  },
  [MESSAGE_TYPES.SMS]: {
    label: 'SMS',
    description: 'Send an SMS to the user',
    icon: <MessageSquare />,
  },
  [MESSAGE_TYPES.WHATSAPP]: {
    label: 'WhatsApp',
    description: 'Send a WhatsApp message to the user',
    icon: <RiWhatsappFill />,
  },
}
