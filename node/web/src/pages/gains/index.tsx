import {format} from 'date-fns'
import React, {useCallback, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Button} from '../../components/Button'
import {DatePickers} from '../../components/DatePickers'
import {Grid} from '../../components/Grid'
import {LineItem} from '../../components/LineItem'
import {Loading} from '../../components/Loading'
import {TextField} from '../../components/TextField'
import api from '../../services/api'
import {formatDate, formatPrice, formatToISOStringDate} from '../../utils'

interface GainsProps {
  actionName: string
}

interface EarningsProjection {
  name: string
  purchasedAmount: number
  purchasedAt: string // data em formato ISO 8601,
  priceAtDate: number // preço na data de compra
  lastPrice: number // preço mais recente
  capitalGains: number // ganhos ou perdas com a ação, em reais
}

const Gains: React.FC = () => {
  const {actionName} = useParams<GainsProps>()

  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const history = useHistory()

  const [purchasedAmount, setPurchasedAmount] = useState<string>('0')
  const [purchasedAt, setPurchasedAt] = useState<string>(currentDate)
  const [projectionGains, setProjectionGains] = useState<EarningsProjection>(
    {} as EarningsProjection
  )
  const [loading, setLoading] = useState(false)

  const goToFavorites = () => {
    history.goBack()
  }

  const searchEarningsProjection = useCallback(async () => {
    try {
      setLoading(true)
      const {data} = await api.get<EarningsProjection>(
        `stocks/${actionName}/gains`,
        {
          params: {
            purchasedAmount,
            purchasedAt: formatToISOStringDate(purchasedAt)
          }
        }
      )

      setProjectionGains(data)
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message || 'Erro'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [actionName, purchasedAmount, purchasedAt])

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
      <Grid type={'container'}>
        <Grid type={'item'} xs={2}>
          <DatePickers
            value={purchasedAt}
            label="Data da compra"
            onChange={(e) => {
              setPurchasedAt(e.target.value)
            }}
          />
        </Grid>
        <TextField
          label={'Quantidade da compra'}
          placeHolder={
            'Insira a quantidade de ações de compra para a simulação'
          }
          xs={6}
          defaultValue={purchasedAmount}
          type={'number'}
          onChange={(e) => setPurchasedAmount(e.target.value)}
        />
        <Grid type={'item'} xs={4}>
          <Button onClick={searchEarningsProjection}>Calcular ganhos</Button>
        </Grid>{' '}
      </Grid>

      {projectionGains.name && (
        <Grid type={'container'}>
          <LineItem xs={4}>Nome : {projectionGains.name}</LineItem>
          <LineItem xs={4}>
            Data da cotação atual :{' '}
            {projectionGains.purchasedAt
              ? formatDate(projectionGains.purchasedAt)
              : ''}
          </LineItem>
          <LineItem xs={4}>
            Preço na data de compra :{' '}
            {projectionGains.priceAtDate
              ? formatPrice(projectionGains.priceAtDate)
              : ''}
          </LineItem>
          <LineItem xs={4}>
            Preço mais recente :{' '}
            {projectionGains.lastPrice
              ? formatPrice(projectionGains.lastPrice)
              : ''}
          </LineItem>
          <LineItem xs={4}>
            Quantidade da compra :{' '}
            {projectionGains.purchasedAmount
              ? projectionGains.purchasedAmount
              : ''}
          </LineItem>
          <LineItem xs={4}>
            Ganhos :{' '}
            {projectionGains.capitalGains
              ? formatPrice(projectionGains.capitalGains)
              : ''}
          </LineItem>
        </Grid>
      )}
    </>
  )
}

export default Gains
