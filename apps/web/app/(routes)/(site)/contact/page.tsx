import { Contact } from '@rabbit/design-system/components/site/contact/contact'
import SiteLayout from '@rabbit/design-system/components/site/site-layout'

export const dynamic = 'force-dynamic'

export default function ContactPage() {
  return (
    <SiteLayout>
      <Contact />
    </SiteLayout>
  )
}
