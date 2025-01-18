const currencySymbols: Record<string, string> = {
  usd: '$',
  eur: '€',
  gbp: '£',
  cad: 'CA$',
  aud: 'A$',
}

export function formatCurrency(
  amount: number | null,
  currency: string = 'usd'
) {
  if (amount === null) return 'Free'

  const symbol = currencySymbols[currency.toLowerCase()] || '$'
  return `${symbol}${amount}`
}
