import { createAudioFilesAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import CreateFormUploadUrl from '../upload/create-form-upload-url'
import CreateFormUploads from '../upload/create-form-uploads'
import { useAtom } from 'jotai'
import CreateFormUploadsReset from '../upload/create-form-uploads-reset'
import { FileUploader } from '@ff/design-system/components/misc/file-uploader/file-uploader'
import NonRequiredLabel from '@ff/design-system/components/misc/non-required-label'

const MAX_AUDIO_FILES = 1

export default function CreateFormAudio() {
  const [audioFiles, setAudioFiles] = useAtom(createAudioFilesAtom)

  return (
    <div className="flex flex-col gap-4 p-4">
      <NonRequiredLabel>Audio</NonRequiredLabel>
      <FileUploader
        value={audioFiles.filter((file) => file instanceof File)}
        maxSize={8 * 1024 * 1024}
        onValueChange={setAudioFiles}
        setOpen={() => {}}
        accept={{ 'audio/*': [] }}
        maxFileCount={MAX_AUDIO_FILES}
        disabled={audioFiles.length >= MAX_AUDIO_FILES}
        noPreview
      />
      <div className="flex gap-2">
        <CreateFormUploads
          maxFileCount={1 - audioFiles.length}
          accept={['audio']}
          disabled={audioFiles.length >= 1}
          files={audioFiles}
          setFiles={setAudioFiles}
        />
        <CreateFormUploadUrl
          files={audioFiles}
          setFiles={setAudioFiles}
          disabled={audioFiles.length >= MAX_AUDIO_FILES}
          placeholder="https://example.com/audio.mp3"
        />
      </div>
      <CreateFormUploadsReset
        files={audioFiles}
        setFiles={setAudioFiles}
        maxFileCount={MAX_AUDIO_FILES}
      />
    </div>
  )
}
