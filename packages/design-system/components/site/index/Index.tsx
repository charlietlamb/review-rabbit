import { Hero } from './hero/hero'
import { SocialProof } from './social-proof/social-proof-section'
import { Features } from './features/features-section'
import { Testimonials } from './testimonials/testimonials'
import { Faq } from './faq/faq-section'
import CtaSection from './cta-section'
import Rank from './rank/rank'
import { WorkflowDemo } from './workflow/workflow-demo'

export default function Index() {
  return (
    <div className="flex flex-col divide-y">
      <Hero />
      <Rank />
      <SocialProof />
      <Features />
      <WorkflowDemo />
      <Testimonials />
      <Faq />
      <CtaSection />
    </div>
  )
}
