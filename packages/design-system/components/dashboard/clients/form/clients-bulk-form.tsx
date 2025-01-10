import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Button } from '@rabbit/design-system/components/ui/button'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { FormContext } from '@rabbit/design-system/components/form/form-context'
import SelectState from '@rabbit/design-system/components/form/clients/select/select-state'
import { useAtomValue } from 'jotai'
import {
  clientsBulkDataAtom,
  clientsBulkHeadersAtom,
} from '@rabbit/design-system/atoms/dashboard/clients/clients-bulk-atoms'
import { Checkbox } from '@rabbit/design-system/components/ui/checkbox'
import getBulkClientData from '../lib/get-bulk-client-data'
import { addBulkClients } from '@rabbit/design-system/actions/clients/bulk-add-clients'
import { HttpStatusCodes } from '@rabbit/http'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'

export default function ClientsBulkForm({
  onSuccess,
  className,
}: {
  onSuccess?: () => void
  className?: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [attemptSubmitted, setAttemptSubmitted] = useState<boolean>(false)
  const clientBulkData = useAtomValue(clientsBulkDataAtom)
  const clientBulkHeaders = useAtomValue(clientsBulkHeadersAtom)
  const [emailHeader, setEmailHeader] = useState<string | undefined>()
  const [phoneHeader, setPhoneHeader] = useState<string | undefined>()
  const [nameHeader, setNameHeader] = useState<string | undefined>()
  const [lastNameHeader, setLastNameHeader] = useState<string | undefined>()
  const [twoNames, setTwoNames] = useState<boolean>(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!clientBulkHeaders) return
    for (const header of clientBulkHeaders) {
      if (header.toLowerCase().includes('mail')) {
        setEmailHeader(header)
      }
      if (
        header.toLowerCase().includes('phone') ||
        header.toLowerCase().includes('mobile') ||
        header.toLowerCase().includes('cell') ||
        header.toLowerCase().includes('number')
      ) {
        setPhoneHeader(header)
      }
      if (header.toLowerCase().includes('name')) {
        setNameHeader(header)
      }
      if (
        header.toLowerCase().includes('name') ||
        header.toLowerCase().includes('first')
      ) {
        setNameHeader(header)
      }
      if (header.toLowerCase().includes('last')) {
        setTwoNames(true)
        setLastNameHeader(header)
      }
    }
  }, [clientBulkHeaders])

  function validateForm() {
    if (!nameHeader) {
      toast.error('Name column header is required')
      return false
    }
    if (twoNames) {
      if (!lastNameHeader) {
        toast.error('Last Name column header is required')
        return false
      }
    }
    if (!emailHeader) {
      toast.error('Email column header is required')
      return false
    }
    if (!phoneHeader) {
      toast.error('Phone column header is required')
      return false
    }
    return true
  }

  async function handleSubmit() {
    setIsLoading(true)
    setAttemptSubmitted(true)
    if (validateForm()) {
      const bulkClientData = getBulkClientData(
        clientBulkData,
        nameHeader!,
        lastNameHeader!,
        emailHeader!,
        phoneHeader!,
        twoNames
      )
      const status = await addBulkClients(bulkClientData)
      if (status === HttpStatusCodes.OK) {
        toast.success('Clients added', {
          description: 'You can run some automations on these clients.',
        })
        onSuccess?.()
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS })
      } else {
        toast.error('Failed to add clients', {
          description:
            'Make sure your header names are correct and your csv data is correct.',
        })
      }
    }
    setIsLoading(false)
  }

  if (!clientBulkHeaders) return null
  return (
    <FormContext.Provider value={{ attemptSubmitted }}>
      <div className="flex flex-col gap-4 w-full mx-auto">
        <div className="flex gap-2">
          <SelectState
            className="w-full"
            value={nameHeader}
            setValue={setNameHeader}
            options={clientBulkHeaders}
            label={twoNames ? 'First Name' : 'Name'}
            required
          />
          {twoNames ? (
            <SelectState
              className="w-full"
              value={lastNameHeader}
              setValue={setLastNameHeader}
              options={clientBulkHeaders}
              label="Last Name"
              required
            />
          ) : null}
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setTwoNames(!twoNames)}
        >
          <Checkbox
            checked={twoNames}
            onCheckedChange={(checked) => setTwoNames(checked as boolean)}
            required
          />
          <span className="text-sm text-muted-foreground">
            Combine first and last name fields
          </span>
        </div>
        <SelectState
          value={emailHeader}
          setValue={setEmailHeader}
          options={clientBulkHeaders}
          label="Email"
          required
        />
        <SelectState
          value={phoneHeader}
          setValue={setPhoneHeader}
          options={clientBulkHeaders}
          label="Phone"
        />
        <Button
          className="w-full"
          disabled={isLoading}
          variant="shine"
          colors="none"
          onClick={() => {
            handleSubmit()
          }}
        >
          {isLoading ? <Spinner /> : 'Bulk Add Clients'}
        </Button>
      </div>
    </FormContext.Provider>
  )
}
