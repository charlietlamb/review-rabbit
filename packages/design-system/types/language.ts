export const languagesWithFlags = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'ja', label: 'Japanese', flag: '🇯🇵' },
  { value: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { value: 'de', label: 'German', flag: '🇩🇪' },
  { value: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { value: 'fr', label: 'French', flag: '🇫🇷' },
  { value: 'ko', label: 'Korean', flag: '🇰🇷' },
  { value: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  { value: 'it', label: 'Italian', flag: '🇮🇹' },
  { value: 'es', label: 'Spanish', flag: '🇪🇸' },
  { value: 'id', label: 'Indonesian', flag: '🇮🇩' },
  { value: 'nl', label: 'Dutch', flag: '🇳🇱' },
  { value: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { value: 'fil', label: 'Filipino', flag: '🇵🇭' },
  { value: 'pl', label: 'Polish', flag: '🇵🇱' },
  { value: 'sv', label: 'Swedish', flag: '🇸🇪' },
  { value: 'bg', label: 'Bulgarian', flag: '🇧🇬' },
  { value: 'ro', label: 'Romanian', flag: '🇷🇴' },
  { value: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { value: 'cs', label: 'Czech', flag: '🇨🇿' },
  { value: 'el', label: 'Greek', flag: '🇬🇷' },
  { value: 'fi', label: 'Finnish', flag: '🇫🇮' },
  { value: 'hr', label: 'Croatian', flag: '🇭🇷' },
  { value: 'ms', label: 'Malay', flag: '🇲🇾' },
  { value: 'sk', label: 'Slovak', flag: '🇸🇰' },
  { value: 'da', label: 'Danish', flag: '🇩🇰' },
  { value: 'ta', label: 'Tamil', flag: '🇮🇳' },
  { value: 'uk', label: 'Ukrainian', flag: '🇺🇦' },
  { value: 'ru', label: 'Russian', flag: '🇷🇺' },
] as const

export const languages = languagesWithFlags.map((language) => language.value)

export const languagesMap = new Map(
  languagesWithFlags.map((language) => [language.value, language])
)

export const languagesOptions = languagesWithFlags.map((language) => ({
  value: language.value,
  label: `${language.flag} ${language.label}`,
}))

export type Language = (typeof languages)[number]

export type LanguageWithFlag = {
  value: Language
  label: string
  flag: string
}
