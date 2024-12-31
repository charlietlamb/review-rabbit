import { Business } from '@rabbit/database/schema'
import { useState } from 'react'

export default function BusinessForm({ business }: { business?: Business }) {
  const [title, setTitle] = useState(business?.name || '')
  const [image, setImage] = useState<string | null>(business?.image || null)
  const [email, setEmail] = useState<string>(business?.email || '')
  const [phone, setPhone] = useState<string>(business?.phone || '')
  return <div></div>
}
