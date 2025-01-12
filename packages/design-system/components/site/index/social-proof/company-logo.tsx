import Image from 'next/image'

type CompanyLogoProps = {
  src: string
  className?: string
}

export function CompanyLogo({ src, className = '' }: CompanyLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        alt="Company Logo"
        src={src}
        width={160}
        height={40}
        className="object-contain"
      />
    </div>
  )
}
