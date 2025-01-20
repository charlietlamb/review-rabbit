import { Business } from '@rabbit/database/schema'
import InputWithIconState from '@rabbit/design-system/components/form/input/input-with-icon-state'
import { Link, Mail, Type } from 'lucide-react'
import { useState } from 'react'
import ImageState from '@rabbit/design-system/components/form/image/image-state'
import PhoneNumberInputState from '@rabbit/design-system/components/form/phone/phone-number-input-state'
import { FormProvider } from '@rabbit/design-system/components/form/form-context'
import { Button } from '@rabbit/design-system/components/ui/button'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateBusiness } from '@rabbit/design-system/actions/business/update-business'
import { createBusiness } from '@rabbit/design-system/actions/business/create-business'
import { getUploadPresignedUrl } from '@rabbit/design-system/actions/s3/upload/get-upload-presigned-url'
import { v4 as uuid } from 'uuid'
import { HttpStatusCodes } from '@rabbit/http'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { env } from '@rabbit/env'

export default function BusinessForm({
  business,
  onSuccess,
}: {
  business?: Business
  onSuccess?: () => void
}) {
  const [title, setTitle] = useState(business?.name || '')
  const [image, setImage] = useState<File | null>(null)
  const [email, setEmail] = useState<string>(business?.email || '')
  const [phone, setPhone] = useState<string>(business?.phone || '')
  const [url, setUrl] = useState<string>(business?.url || '')
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  function validateForm() {
    if (!title.length) {
      toast.error('Please enter a business name')
      return false
    }
    if (!z.string().email().safeParse(email).success) {
      toast.error('Please enter a valid email')
      return false
    }
    if (!z.string().url().safeParse(url).success) {
      toast.error('Please enter a valid Google Reviews URL')
      return false
    }
    return true
  }

  async function handleSubmit() {
    setAttemptSubmitted(true)
    if (!validateForm()) return
    setIsLoading(true)
    const businessId = business?.id ?? uuid()
    const imageUrl = `public/rabbit/business/${businessId}`
    if (image) {
      const uploadPresignedUrl = await getUploadPresignedUrl(imageUrl)
      if (uploadPresignedUrl) {
        await fetch(uploadPresignedUrl, {
          method: 'PUT',
          body: image,
        })
      } else {
        return toast.error('Failed to get upload url', {
          description: 'Please try again',
        })
      }
    }
    const result = business
      ? await updateBusiness(
          {
            name: title,
            email,
            phone,
            url,
            image: image ? imageUrl : business.image,
          },
          business.id
        )
      : await createBusiness({
          name: title,
          email,
          phone,
          url,
          image: image ? imageUrl : null,
        })
    if (result === HttpStatusCodes.OK) {
      toast.success('Business created', {
        description: 'Your business has been created successfully',
      })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BUSINESS })
      onSuccess?.()
    } else {
      toast.error('Failed to create business', {
        description: 'Please try again',
      })
    }
    setIsLoading(false)
  }

  return (
    <FormProvider value={{ attemptSubmitted }}>
      <div className="flex flex-col gap-4">
        <InputWithIconState
          icon={<Type />}
          placeholder="Business Name"
          value={title}
          onChange={(value) => setTitle(value)}
          required
          name="name"
          label="Name"
          type="text"
        />
        <InputWithIconState
          icon={<Mail />}
          placeholder="Business Email"
          value={email}
          onChange={(value) => setEmail(value)}
          required
          name="email"
          label="Email"
          type="email"
        />
        <PhoneNumberInputState
          name="phone"
          label="Phone"
          value={phone}
          onChange={(value) => setPhone(value)}
          required={false}
        />
        <InputWithIconState
          icon={<Link />}
          placeholder="Google Reviews URL"
          value={url}
          onChange={(value) => setUrl(value)}
          required
          name="url"
          label="Google Reviews URL"
          type="text"
        />
        <ImageState
          previewUrl={
            business?.image
              ? `${env.NEXT_PUBLIC_AWS_S3_URL}${business.image}`
              : undefined
          }
          value={image ?? undefined}
          onChange={(value) => setImage(value)}
          required={false}
          label="Image"
          name="image"
        />
        <Button variant="shine" className="w-full" onClick={handleSubmit}>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </div>
    </FormProvider>
  )
}
