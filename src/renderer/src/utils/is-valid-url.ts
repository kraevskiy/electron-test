export const isValidUrl = (url?: string): boolean => {
  if (!url) {
    return false
  }
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}
