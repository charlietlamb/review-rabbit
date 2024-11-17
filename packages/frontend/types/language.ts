export const languagesWithFlags = [
  { value: 'english-usa', label: 'English (USA)', flag: '🇺🇸' },
  { value: 'english-uk', label: 'English (UK)', flag: '🇬🇧' },
  { value: 'english-australia', label: 'English (Australia)', flag: '🇦🇺' },
  { value: 'english-canada', label: 'English (Canada)', flag: '🇨🇦' },
  { value: 'japanese', label: 'Japanese', flag: '🇯🇵' },
  { value: 'chinese', label: 'Chinese', flag: '🇨🇳' },
  { value: 'german', label: 'German', flag: '🇩🇪' },
  { value: 'hindi', label: 'Hindi', flag: '🇮🇳' },
  { value: 'french-france', label: 'French (France)', flag: '🇫🇷' },
  { value: 'french-canada', label: 'French (Canada)', flag: '🇨🇦' },
  { value: 'korean', label: 'Korean', flag: '🇰🇷' },
  { value: 'portuguese-brazil', label: 'Portuguese (Brazil)', flag: '🇧🇷' },
  { value: 'portuguese-portugal', label: 'Portuguese (Portugal)', flag: '🇵🇹' },
  { value: 'italian', label: 'Italian', flag: '🇮🇹' },
  { value: 'spanish-spain', label: 'Spanish (Spain)', flag: '🇪🇸' },
  { value: 'spanish-mexico', label: 'Spanish (Mexico)', flag: '🇲🇽' },
  { value: 'indonesian', label: 'Indonesian', flag: '🇮🇩' },
  { value: 'dutch', label: 'Dutch', flag: '🇳🇱' },
  { value: 'turkish', label: 'Turkish', flag: '🇹🇷' },
  { value: 'filipino', label: 'Filipino', flag: '🇵🇭' },
  { value: 'polish', label: 'Polish', flag: '🇵🇱' },
  { value: 'swedish', label: 'Swedish', flag: '🇸🇪' },
  { value: 'bulgarian', label: 'Bulgarian', flag: '🇧🇬' },
  { value: 'romanian', label: 'Romanian', flag: '🇷🇴' },
  { value: 'arabic-saudi', label: 'Arabic (Saudi Arabia)', flag: '🇸🇦' },
  { value: 'arabic-uae', label: 'Arabic (UAE)', flag: '🇦🇪' },
  { value: 'czech', label: 'Czech', flag: '🇨🇿' },
  { value: 'greek', label: 'Greek', flag: '🇬🇷' },
  { value: 'finnish', label: 'Finnish', flag: '🇫🇮' },
  { value: 'croatian', label: 'Croatian', flag: '🇭🇷' },
  { value: 'malay', label: 'Malay', flag: '🇲🇾' },
  { value: 'slovak', label: 'Slovak', flag: '🇸🇰' },
  { value: 'danish', label: 'Danish', flag: '🇩🇰' },
  { value: 'tamil', label: 'Tamil', flag: '🇮🇳' },
  { value: 'ukrainian', label: 'Ukrainian', flag: '🇺🇦' },
  { value: 'russian', label: 'Russian', flag: '🇷🇺' },
  { value: 'hungarian', label: 'Hungarian', flag: '🇭🇺' },
  { value: 'norwegian', label: 'Norwegian', flag: '🇳🇴' },
  { value: 'vietnamese', label: 'Vietnamese', flag: '🇻🇳' },
] as const

export const languages = languagesWithFlags.map((language) => language.value)

export const languagesMap = new Map(
  languagesWithFlags.map((language) => [language.value, language])
)

export type Language = (typeof languages)[number]

export type LanguageWithFlag = {
  value: Language
  label: string
  flag: string
}
