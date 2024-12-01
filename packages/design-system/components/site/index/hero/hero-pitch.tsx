import Image from 'next/image'

export default function HeroPitch() {
  return (
    <>
      <div className="absolute top-[100%] left-0 right-0 transform flex justify-center -translate-y-3/4 opacity-90 lg:hidden">
        <Image
          alt="SaaS Dashboard"
          src="/images/dashboard.png"
          width={1000}
          height={698}
          priority
          className="rounded-xl border border-border shadow-lg w-[80%]"
        />
      </div>
      <Image
        alt="SaaS Dashboard"
        src="/images/dashboard.png"
        width={1000}
        height={698}
        priority
        className="rounded-xl border border-border shadow-lg hidden lg:block"
      />
    </>
  )
}
