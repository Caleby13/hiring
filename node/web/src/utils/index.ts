import { format, parseISO, startOfDay } from 'date-fns'

export const formatPrice = (value: number | string) => {
    const VALUE = Number(value)

    const { format } = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return format(VALUE)
}

export const formatDateTime = (value: string | Date) => {
    let VALUE: Date | null = null

    if (value instanceof Date) {
        VALUE = value
    }

    if (typeof value === 'string') {
        VALUE = parseISO(value)
    }

    if (VALUE instanceof Date) {
        return format(VALUE as Date, 'dd/MM/yyyy HH:mm:ss')
    }

    return ''
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
        return format(VALUE as Date, 'dd/MM/yyyy')
    }

    return ''
}

export const formatToISOStringDate = (value: string | Date) => {
    let VALUE: Date | null = null

    if (value instanceof Date) {
        VALUE = value
    }

    if (typeof value === 'string') {
        VALUE = parseISO(value)
    }

    const [year, month, date] = format(VALUE as Date, 'yyyy-MM-dd').split('-')

    if (VALUE instanceof Date) {
        return startOfDay(new Date(Number(year), Number(month) - 1, Number(date)))
    }

    return ''
}
