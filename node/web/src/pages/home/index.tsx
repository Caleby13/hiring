import React, {useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Button} from '../../components/Button'
import {Divider} from '../../components/Divider'
import {Grid} from '../../components/Grid'
import {LineItem} from '../../components/LineItem'
import {Loading} from '../../components/Loading'
import {TextField} from '../../components/TextField'
import api from '../../services/api'

const Home: React.FC = () => {
  const FAVORITEKEY = '@favorites'

  const history = useHistory()

  const [keyword, setKeyword] = useState('')
  const [rows, setRows] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  const goToFavorites = () => {
    history.push('/favorites')
  }

  const addFavorite = useCallback(
    (item: string) => {
      try {
        const exist = favorites.find((prevFavorites) => prevFavorites === item)
        if (exist) {
          toast.info('Está ação já está nos favoritos')
          return
        }
        setFavorites((prev) => [item, ...prev])
        toast.success('Adicionado com sucesso')
      } catch (err) {
        const message = err?.response?.data?.error?.message || 'Erro'
        toast.error(message)
      }
    },
    [favorites]
  )

  const searchEndpoint = useCallback(async () => {
    try {
      setLoading(true)
      if (!keyword) {
        toast.error('Informe o nome da ação que deseja buscar')
        return
      }
      const {data} = await api.get(`/stocks/searchEndpoint/${keyword}`)
      setRows(data)
    } catch (err) {
      const message = err?.response?.data?.error?.message || 'Erro'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [keyword])

  useEffect(() => {
    const persistFavorite = localStorage.getItem(FAVORITEKEY)
    if (!persistFavorite) {
      return
    }
    setFavorites(JSON.parse(persistFavorite))
  }, [])

  useEffect(() => {
    localStorage.setItem(FAVORITEKEY, JSON.stringify(favorites))
  }, [favorites])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Grid type={'container'} spacing={1}>
        <TextField
          xs={8}
          placeHolder={'Insira o nome da ação desejada. Ex: PETR4.SA, VALE5.SA'}
          label={'Nome da ação'}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Grid type={'item'} xs={2}>
          <Button onClick={searchEndpoint}>Buscar</Button>
        </Grid>
        <Grid type={'item'} xs={2}>
          <Button onClick={goToFavorites}>Favoritos</Button>
        </Grid>
      </Grid>
      {rows.map((item) => (
        <>
          <Grid type={'container'} xs={12}>
            <LineItem xs={3}>{item}</LineItem>
            <Grid type={'item'} xs={3}>
              <Button
                onClick={() => {
                  addFavorite(item)
                }}
                size={'small'}
                variant={'outlined'}
              >
                Add Favoritos
              </Button>
            </Grid>
          </Grid>
          <Divider />
        </>
      ))}
    </>
  )
}

export default Home
