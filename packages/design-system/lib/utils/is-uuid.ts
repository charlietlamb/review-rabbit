export const isUuid = (value: string) => {
  try {
    return /^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/.test(
      value
    )
  } catch {
    return false
  }
}
