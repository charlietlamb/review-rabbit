import { CompanyLogo } from './company-logo'
import { companies } from './social-proof-data'

export function SocialProof() {
  return (
    <section className="container flex flex-col items-center gap-10 py-24">
      <h2 className="text-center text-lg font-semibold leading-8">
        Trusted by the world&apos;s best companies
      </h2>
      <div className="grid w-full grid-cols-4 gap-10 sm:grid-cols-6 sm:gap-12 lg:grid-cols-5">
        {companies.map((company) => (
          <CompanyLogo
            key={company.src}
            src={company.src}
            className={company.className}
          />
        ))}
      </div>
    </section>
  )
}
