export function numberToSize(size: number) {
  if (size < 1000000) return `${(size / 1000).toFixed(2)} KB`
  if (size < 1000000000) return `${(size / 1000000).toFixed(2)} MB`
  return `${(size / 1000000000).toFixed(2)} GB`
}
