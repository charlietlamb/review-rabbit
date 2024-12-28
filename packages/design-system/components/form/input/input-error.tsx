export default function InputError({
  isError,
  error,
}: {
  isError: boolean
  error: string
}) {
  if (!isError) return null
  return <p className="text-red-500 text-sm">{error}</p>
}
