import { Tailwind } from '@react-email/components'

export default function TailwindProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Tailwind
      config={{
        theme: { extend: { colors: { brand: '#007291', primary: '#007291' } } },
      }}
    >
      {children}
    </Tailwind>
  )
}
