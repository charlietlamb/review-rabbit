import { Header } from './header'
import { Hero } from './hero'
import { SocialProof } from './social-proof'
import { Features } from './features-section'
import { Testimonials } from './testimonials'
import { Faq } from './faq'
import { CtaSection } from './cta-section'
import { Footer } from './footer'

export default function Index() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <Testimonials />
      <Faq />
      <CtaSection />
      <Footer />
    </>
  )
}
