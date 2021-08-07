
export const dateStringToISOString = (dataString: string): string => {
  const dateMethod = new Date(dataString)
  const dateToISOString = dateMethod.toISOString()
  return dateToISOString
}

export const stringToDate = (dataString: string): Date => {
  const date = new Date(dataString)
  return date
}
