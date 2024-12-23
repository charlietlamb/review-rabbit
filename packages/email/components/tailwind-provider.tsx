import { Tailwind } from '@react-email/components'

export default function TailwindProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: { colors: { brand: '#00ace0', primary: '#00ace0' } },
        },
      }}
    >
      {children}
    </Tailwind>
  )
}
