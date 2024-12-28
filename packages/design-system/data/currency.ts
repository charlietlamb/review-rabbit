export const currenciesWithFlags = [
  { value: 'usd', label: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { value: 'eur', label: 'Euro', flag: '🇪🇺', symbol: '€' },
  { value: 'gbp', label: 'British Pound', flag: '🇬🇧', symbol: '£' },
  { value: 'jpy', label: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  { value: 'cad', label: 'Canadian Dollar', flag: '🇨🇦', symbol: '$' },
  { value: 'aud', label: 'Australian Dollar', flag: '🇦🇺', symbol: '$' },
  { value: 'chf', label: 'Swiss Franc', flag: '🇨🇭', symbol: 'CHF' },

  { value: 'cny', label: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  { value: 'hkd', label: 'Hong Kong Dollar', flag: '🇭🇰', symbol: '$' },
  { value: 'sgd', label: 'Singapore Dollar', flag: '🇸🇬', symbol: '$' },
  { value: 'inr', label: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  { value: 'krw', label: 'South Korean Won', flag: '🇰🇷', symbol: '₩' },

  { value: 'sek', label: 'Swedish Krona', flag: '🇸🇪', symbol: 'kr' },
  { value: 'nok', label: 'Norwegian Krone', flag: '🇳🇴', symbol: 'kr' },
  { value: 'dkk', label: 'Danish Krone', flag: '🇩🇰', symbol: 'kr' },
  { value: 'pln', label: 'Polish Złoty', flag: '🇵🇱', symbol: 'zł' },

  { value: 'nzd', label: 'New Zealand Dollar', flag: '🇳🇿', symbol: '$' },
  { value: 'mxn', label: 'Mexican Peso', flag: '🇲🇽', symbol: '$' },
  { value: 'brl', label: 'Brazilian Real', flag: '🇧🇷', symbol: 'R$' },
  { value: 'zar', label: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
] as const

export const currencies = currenciesWithFlags.map((currency) => currency.value)

export const currenciesMap = new Map(
  currenciesWithFlags.map((currency) => [currency.value, currency])
)

export const currenciesOptions = currenciesWithFlags.map((currency) => ({
  value: currency.value,
  label: `${currency.flag} ${currency.label} (${currency.symbol})`,
}))

export type Currency = (typeof currencies)[number]

export type CurrencyWithFlag = {
  value: Currency
  label: string
  flag: string
  symbol: string
}
