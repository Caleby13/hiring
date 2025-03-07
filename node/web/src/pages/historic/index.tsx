import {format} from 'date-fns'
import React, {useCallback, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Button} from '../../components/Button'
import {DatePickers} from '../../components/DatePickers'
import {Divider} from '../../components/Divider'
import {Grid} from '../../components/Grid'
import {LineItem} from '../../components/LineItem'
import {Loading} from '../../components/Loading'
import {Title} from '../../components/Title/indes'
import api from '../../services/api'
import {formatDate, formatPrice, formatToISOStringDate} from '../../utils'

interface StockHistory {
  name: string
  prices: PriceHistory[]
}

interface PriceHistory {
  opening: number
  low: number
  high: number
  closing: number
  pricedAt: string // data no formato ISO 8601, UTC
}

const Historic: React.FC = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd')

  const history = useHistory()
  const {actionName} = useParams<{actionName: string}>()

  const [toDate, setToDate] = useState(currentDate)
  const [fromDate, setFromDate] = useState(currentDate)
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([])
  const [loading, setLoading] = useState(false)

  const goToFavorites = () => {
    history.goBack()
  }

  const searchHistory = useCallback(async () => {
    try {
      setLoading(true)
      const {data} = await api.get<StockHistory>(
        `/stocks/${actionName}/history`,
        {
          params: {
            to: formatToISOStringDate(toDate),
            from: formatToISOStringDate(fromDate)
          }
        }
      )
      setPriceHistory(data.prices)
    } catch (err) {
      const message = err?.response?.data?.error?.message || 'Erro'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [actionName, toDate, fromDate])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Grid type={'container'}>
        <Grid type={'item'} xs={3}>
          <Button onClick={goToFavorites}>Ir para tela anterior</Button>
        </Grid>
      </Grid>
      <Grid type={'container'} justifyContent={'flex-start'}>
        <Grid type={'item'} xs={2}>
          <DatePickers
            label="Data Final"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value)
            }}
          />
        </Grid>
        <Grid type={'item'} xs={2}>
          <DatePickers
            label="Data Final"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value)
            }}
          />
        </Grid>
        <Grid type={'item'} xs={4}>
          <Button onClick={searchHistory}>Buscar Registros</Button>
        </Grid>
      </Grid>
      <Title>{actionName}</Title>
      {priceHistory.map((item) => (
        <>
          <Grid type={'container'}>
            <LineItem xs={2}>{formatDate(item.pricedAt)}</LineItem>
            <LineItem xs={2}>Open: {formatPrice(item.opening)}</LineItem>
            <LineItem xs={2}>Closing: {formatPrice(item.closing)}</LineItem>
            <LineItem xs={2}>Low: {formatPrice(item.low)}</LineItem>
            <LineItem xs={2}>High: {formatPrice(item.high)}</LineItem>
          </Grid>
          <Divider />
        </>
      ))}
    </>
  )
}

export default Historic
