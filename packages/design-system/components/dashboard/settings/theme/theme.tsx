import RequiredLabel from '@burse/design-system/components/misc/required-label'
import CustomTheme from './custom-theme'
import BasicTheme from './basic-theme'

export default function Theme() {
  return (
    <div className="flex flex-col gap-4">
      <RequiredLabel className="text-base" required={false}>
        Theme
      </RequiredLabel>
      <BasicTheme />
      <CustomTheme />
    </div>
  )
}
