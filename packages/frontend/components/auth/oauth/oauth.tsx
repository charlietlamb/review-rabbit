import { Button } from '@/components/ui/button'
import { RiGithubFill, RiGoogleFill, RiTwitterXFill } from '@remixicon/react'

export default function OAuth() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        className="flex-1"
        colors="outline"
        aria-label="Login with Google"
        size="icon"
      >
        <RiGoogleFill
          size={16}
          aria-hidden="true"
          className="text-foreground"
        />
      </Button>
      <Button
        className="flex-1"
        colors="outline"
        aria-label="Login with X"
        size="icon"
      >
        <RiTwitterXFill
          className="text-[#14171a] text-foreground"
          size={16}
          aria-hidden="true"
        />
      </Button>
      <Button
        className="flex-1"
        colors="outline"
        aria-label="Login with GitHub"
        size="icon"
      >
        <RiGithubFill
          className="text-black text-foreground"
          size={16}
          aria-hidden="true"
        />
      </Button>
    </div>
  )
}
