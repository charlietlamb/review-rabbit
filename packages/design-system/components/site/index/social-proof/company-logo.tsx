import Image from 'next/image'

type CompanyLogoProps = {
  src: string
  className?: string
}

export function CompanyLogo({ src, className = '' }: CompanyLogoProps) {
  return (
    <div className={`relative h-11 flex-1 sm:h-10 ${className}`}>
      <Image alt="Company Logo" src={src} fill className="object-contain" />
    </div>
  )
}
