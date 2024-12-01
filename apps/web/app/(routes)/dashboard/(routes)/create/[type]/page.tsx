import { getProviderConnects } from '@ff/design-system/actions/connect/get-provider-connects'
import CreateForm from '@ff/design-system/components/dashboard/create/form/create-form'
import { createOptionsMap } from '@ff/design-system/components/dashboard/create/options/create-options-data'
import { redirect } from 'next/navigation'

export default async function page({ params }: { params: { type: string } }) {
  const { type } = await params
  const createOption = createOptionsMap.get(type)

  if (!createOption) {
    return redirect('/dashboard/create')
  }

  const connects = await getProviderConnects('all')

  return <CreateForm createOption={createOption} connects={connects} />
}
