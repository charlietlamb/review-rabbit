import { Hero } from './hero'
import { SocialProof } from './social-proof/social-proof-section'
import { Features } from './features/features-section'
import { Testimonials } from './testimonials/testimonials'
import { CtaSection } from './cta-section'
import { Faq } from './faq/faq-section'
export default function Index() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <Testimonials />
      <Faq />
      <CtaSection />
    </>
  )
}
