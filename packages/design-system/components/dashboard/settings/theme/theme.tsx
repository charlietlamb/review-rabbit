import CustomTheme from './custom-theme'
import BasicTheme from './basic-theme'

export default function Theme() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-heading font-bold">Theme</p>
        <p className="text-sm text-muted-foreground">
          Select the theme you want to use for your account.
        </p>
      </div>
      <BasicTheme />
      <CustomTheme />
    </div>
  )
}
