export function nearestDateValue(date: Date) {
  const now = new Date()
  const minutes = date.getMinutes()
  const roundedMinutes = Math.ceil(minutes / 5) * 5

  const result = new Date(date)
  result.setMinutes(roundedMinutes)
  result.setSeconds(0)
  result.setMilliseconds(0)

  // If the resulting time is in the past, add 5 minutes
  if (result.getTime() <= now.getTime()) {
    result.setMinutes(result.getMinutes() + 5)
  }

  return result
}
