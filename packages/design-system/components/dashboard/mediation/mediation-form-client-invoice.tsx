import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import { Client } from '@remio/database/schema/clients'
import { useEffect, useState, useCallback } from 'react'
import { Button } from '@remio/design-system/components/ui/button'
import MoneyInput from '@remio/design-system/components/form/money/money-input-state'
import DatePicker from '@remio/design-system/components/form/date/date-picker-state'
import TextareaInput from '@remio/design-system/components/form/input/textarea-input-state'
import { useAtom } from 'jotai'
import {
  mediationAllClientsAtom,
  mediationClientsAtom,
} from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'
import { InvoiceFormData } from '../invoices/invoice-schema'
import { nearestDateValue } from '@remio/design-system/lib/utils/nearest-date-value'

export default function MediationFormClientInvoice({
  form,
  client,
}: {
  form: TanstackForm<any>
  client?: Client
}) {
  const [mediationAllClients, setMediationAllClients] = useAtom(
    mediationAllClientsAtom
  )
  const [mediationClients, setMediationClients] = useAtom(mediationClientsAtom)
  const [hasInvoice, setHasInvoice] = useState(false)
  const [dueDate, setDueDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [reference, setReference] = useState('')

  const defaultInvoice = {
    amount: 0,
    dueDate: nearestDateValue(new Date()),
    reference: '',
    clientId: '',
  }

  useEffect(() => {
    if (client) {
      const mediationClient = mediationClients.find(
        (mediationClient) => mediationClient.client.id === client.id
      )
      if (mediationClient?.data.invoice) {
        setHasInvoice(true)
        setDueDate(mediationClient.data.invoice.dueDate)
        setAmount(mediationClient.data.invoice.amount)
        setReference(mediationClient.data.invoice.reference ?? '')
      } else {
        setHasInvoice(false)
      }
    } else if (mediationAllClients?.invoice) {
      setHasInvoice(true)
      setDueDate(mediationAllClients.invoice.dueDate)
      setAmount(mediationAllClients.invoice.amount)
      setReference(mediationAllClients.invoice.reference ?? '')
    } else {
      setHasInvoice(false)
    }
  }, [mediationAllClients, mediationClients, client])

  const updateClientInvoice = useCallback(() => {
    if (!hasInvoice) return

    const values = {
      amount,
      dueDate,
      reference,
      clientId: client?.id || '',
    }

    if (client) {
      setMediationClients((prev) =>
        prev.map((mediationClient) =>
          mediationClient.client.id === client.id
            ? {
                ...mediationClient,
                data: {
                  ...mediationClient.data,
                  invoice: values,
                },
              }
            : mediationClient
        )
      )
    } else {
      setMediationAllClients((prev) => ({
        ...prev,
        invoice: values,
      }))
    }
  }, [
    amount,
    dueDate,
    reference,
    client,
    hasInvoice,
    setMediationClients,
    setMediationAllClients,
  ])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateClientInvoice()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [updateClientInvoice])

  function handleAddInvoice() {
    if (client) {
      setMediationClients((prev) =>
        prev.find((c) => c.client.id === client.id)
          ? prev.map((c) =>
              c.client.id === client.id
                ? {
                    ...c,
                    data: {
                      ...c.data,
                      invoice: defaultInvoice,
                    },
                  }
                : c
            )
          : [
              ...prev,
              { client, data: { email: false, invoice: defaultInvoice } },
            ]
      )
    } else {
      setMediationAllClients((prev) => ({
        ...prev,
        invoice: defaultInvoice,
      }))
    }
  }

  function handleRemoveInvoice() {
    if (client) {
      setMediationClients((prev) =>
        prev.map((mediationClient) =>
          mediationClient.client.id === client.id
            ? {
                ...mediationClient,
                data: {
                  ...mediationClient.data,
                  invoice: null,
                },
              }
            : mediationClient
        )
      )
    } else {
      setMediationAllClients((prev) => ({
        ...prev,
        invoice: null,
      }))
    }
  }

  if (!hasInvoice)
    return (
      <Button
        variant="outline"
        onClick={handleAddInvoice}
        className="font-heading font-bold"
      >
        Add Invoice
      </Button>
    )

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-lg font-bold">Invoice</h2>
      <div className="grid grid-cols-2 gap-4">
        <MoneyInput
          value={amount}
          setValue={setAmount}
          name="amount"
          label="Amount"
          placeholder="Amount"
          required
          currency="EUR"
        />
        <DatePicker
          value={dueDate}
          setValue={setDueDate}
          name="dueDate"
          label="Due Date"
          placeholder="Due Date"
          required
        />
        <TextareaInput
          value={reference}
          setValue={setReference}
          name="reference"
          label="Reference"
          placeholder="Reference"
          className="col-span-2"
        />
      </div>
      <Button
        variant="outline"
        className="font-heading font-bold text-red-500"
        onClick={handleRemoveInvoice}
      >
        Remove Invoice
      </Button>
    </div>
  )
}
