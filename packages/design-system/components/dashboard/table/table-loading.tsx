import Spinner from '@rabbit/design-system/components/misc/spinner'

export default function TableLoading() {
  return (
    <div className="flex items-center justify-center h-full flex-grow">
      <Spinner />
    </div>
  )
}
