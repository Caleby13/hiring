import { parseISO, format, addDays } from 'date-fns'

export const stringToDateISO = (dateString: string): string => {
  const dateMethod = new Date(dateString)
  const dateToISOString = dateMethod.toISOString()
  return dateToISOString
}

export const stringToDate = (dateString: string): Date => {
  const date = new Date(dateString)
  return date
}

export const formatDate = (value: string | Date) => {
  let VALUE: Date | null = null

  if (value instanceof Date) {
    VALUE = value
  }

  if (typeof value === 'string') {
    VALUE = parseISO(value)
  }

  if (VALUE instanceof Date) {
    return format(addDays(VALUE, 1), 'yyyy-MM-dd')
  }

  return ''
}
