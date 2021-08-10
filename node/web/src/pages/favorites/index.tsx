import React, {useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Button} from '../../components/Button'
import {Grid} from '../../components/Grid'
import {Title} from '../../components/Title/indes'
import {FavoriteItem} from './components/favoviteItem'

const Favorites: React.FC = () => {
  const FAVORITEKEY = '@favorites'

  const history = useHistory()

  const [favorites, setFavorites] = useState<string[]>([])

  const goToFavorites = () => {
    history.goBack()
  }

  const searchFavorites = useCallback(() => {
    const persistFavorite = localStorage.getItem(FAVORITEKEY)
    if (!persistFavorite) {
      return
    }
    setFavorites(JSON.parse(persistFavorite))
  }, [])

  const handleDelete = useCallback(
    (action: string) => {
      try {
        const savedFavorites = localStorage.getItem(FAVORITEKEY)
        if (savedFavorites) {
          const favorites: string[] = JSON.parse(savedFavorites)
          const index = favorites.indexOf(action)
          if (index > -1) {
            favorites.splice(index, 1)
            localStorage.setItem(FAVORITEKEY, JSON.stringify(favorites))
            searchFavorites()
            toast.success('Excluido com sucesso')
          }
        }
      } catch (err) {
        const message = err?.response?.data?.error?.message || 'Erro'
        toast.error(message)
      }
    },
    [searchFavorites]
  )

  useEffect(() => {
    searchFavorites()
  }, [searchFavorites])

  return (
    <>
      <Grid type={'container'}>
        <Grid type={'item'} xs={3}>
          <Button onClick={goToFavorites}>Ir para tela anterior</Button>
        </Grid>
      </Grid>
      <Title>ÚLTIMA COTAÇÃO</Title>
      <div>
        {favorites.map((item) => (
          <FavoriteItem handleDelete={handleDelete} actionName={item} />
        ))}
      </div>
    </>
  )
}

export default Favorites
