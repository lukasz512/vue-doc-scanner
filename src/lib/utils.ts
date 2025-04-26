// utils.ts

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Converts a timestamp into a locale date-time string.
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}
