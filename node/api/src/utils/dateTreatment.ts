
export const stringToDateISO = (dateString: string): string => {
  const dateMethod = new Date(dateString)
  const dateToISOString = dateMethod.toISOString()
  return dateToISOString
}

export const stringToDate = (dateString: string): Date => {
  const date = new Date(dateString)
  return date
}

export const formatDate = (dateString: string) => {
  const format = (data: number) => {
    if (data < 10) {
      return `0${data}`
    }
    return data
  }
  const newDate = new Date(dateString)
  const dia = format(newDate.getDate())
  const mes = format(newDate.getMonth() + 1)
  const ano = format(newDate.getFullYear())

  return `${ano}-${mes}-${dia}`
}
