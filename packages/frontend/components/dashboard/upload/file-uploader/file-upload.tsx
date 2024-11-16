import { Button } from '@/components/ui/button'

export default function FileUpload({ files }: { files: File[] | undefined }) {
  return (
    <>
      <Button variant="shine" colors="none" disabled={!files?.length}>
        Upload Files
      </Button>
    </>
  )
}
