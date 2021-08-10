import {Divider} from '@material-ui/core'
import React, {useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Button} from '../../../../components/Button'
import {Grid} from '../../../../components/Grid'
import {LineItem} from '../../../../components/LineItem'
import api from '../../../../services/api'
import {formatDateTime, formatPrice} from '../../../../utils'

interface PriceLastAction {
  name: string
  lastPrice: number
  pricedAt: string // data e hora no formato ISO 8601, UTC
}

interface ActionNameProps {
  actionName: string
  handleDelete: Function
}

export const FavoriteItem = ({actionName, handleDelete}: ActionNameProps) => {
  const history = useHistory()

  const [stock, setStock] = useState<PriceLastAction>({} as PriceLastAction)

  const goToHistoric = () => {
    history.push(`/historic/${actionName}`)
  }

  const goToGains = () => {
    history.push(`/gains/${actionName}`)
  }

  const actionsSearch = useCallback(async () => {
    try {
      const {data} = await api.get(`/stocks/${actionName}/quote`)
      setStock(data)
    } catch (err) {
      const message = err?.response?.data?.error?.message || 'Erro'
      toast.error(message)
    } finally {
    }
  }, [actionName])

  useEffect(() => {
    actionsSearch()
  }, [actionsSearch])

  return (
    <div>
      <Grid type={'container'}>
        <LineItem xs={2}>{actionName}</LineItem>
        <LineItem xs={3}>
          {stock.lastPrice
            ? `Preço: ${formatPrice(stock.lastPrice)}`
            : 'Buscando...'}
        </LineItem>
        <LineItem xs={3}>
          {stock.pricedAt
            ? `Data: ${formatDateTime(stock.pricedAt)}`
            : 'Buscando...'}
        </LineItem>
        <Grid type={'item'} xs={1}>
          <Button variant={'outlined'} size={'small'} onClick={goToHistoric}>
            Historico
          </Button>
        </Grid>
        <Grid type={'item'} xs={2}>
          <Button variant={'outlined'} size={'small'} onClick={goToGains}>
            Projeção de ganhos
          </Button>
        </Grid>
        <Grid type={'item'} xs={1}>
          <Button
            onClick={() => handleDelete(actionName)}
            variant={'outlined'}
            size={'small'}
            color={'secondary'}
          >
            Excluir
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </div>
  )
}
