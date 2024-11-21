export function durationToTime(seconds: number) {
  const time = {
    hour: Math.floor(seconds / 3600),
    minute: Math.floor((seconds % 3600) / 60),
    second: seconds % 60,
  }

  return Object.entries(time)
    .filter(([_, value]) => value !== 0)
    .map(([key, value]) => `${value} ${key}${value !== 1 ? 's' : ''}`)
    .join(', ')
}
