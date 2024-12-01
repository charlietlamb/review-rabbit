import { createAudioAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { Label } from '@ff/design-system/components/ui/label'
import { useAtom } from 'jotai'
import UrlInput from '@ff/design-system/components/misc/url-input'
import { useState } from 'react'

export default function CreateFormAudio() {
  const [audio, setAudio] = useAtom(createAudioAtom)
  const [valid, setValid] = useState(false)

  return (
    <div className="flex flex-col gap-4 p-4">
      <Label className="font-heading font-bold">Audio</Label>
      <div className="flex flex-col gap-2">
        <UrlInput
          value={audio}
          setValue={setAudio}
          mediaTypes={['audio']}
          valid={valid}
          setValid={setValid}
          placeholder="https://example.com/audio.mp3"
        />
        <p className="text-sm text-muted-foreground">
          Leave this blank to use the default audio for your post type. Feedflow
          will automatically try to access and validate your resource.
        </p>
      </div>
    </div>
  )
}
