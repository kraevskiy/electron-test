const options: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
}

const formatter = new Intl.DateTimeFormat('en-GB', options)

export const dateFormat = (date: string | Date): string => {
  const parts = formatter.formatToParts(new Date(date))
  return `${parts.find((part) => part.type === 'month')?.value}:${parts.find((part) => part.type === 'hour')?.value} ${parts.find((part) => part.type === 'day')?.value}/${parts.find((part) => part.type === 'month')?.value}/${parts.find((part) => part.type === 'year')?.value}`
}
