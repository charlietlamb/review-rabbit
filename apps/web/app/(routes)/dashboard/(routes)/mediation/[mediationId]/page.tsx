import { getMediationById } from '@remio/design-system/actions/mediations/get-mediation-by-id'
import Mediation from '@remio/design-system/components/dashboard/mediation/mediation'

export default async function page({
  params,
}: {
  params: { mediationId: string }
}) {
  const { mediationId } = await params
  const mediation = await getMediationById(mediationId)
  return <Mediation mediation={mediation} />
}
