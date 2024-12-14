import Image from 'next/image'

export default function HeroPitch() {
  return (
    <Image
      alt="SaaS Dashboard"
      src="/images/dashboard.png"
      width={1000}
      height={698}
      priority
      className="rounded-xl border border-border shadow-lg md:w-[80%] w-full"
    />
  )
}
