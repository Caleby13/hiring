import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ButtonRedirect } from "../../components/ButtonRedirect";
import { Grid } from "../../components/Grid";
import { Title } from "../../components/Title/indes";
import { FavoriteItem } from "./favoviteItem";

const Favorites: React.FC = () => {
  const FAVORITEKEY = "@favorites";

  const [favorites, setFavorites] = useState<string[]>([]);

  const searchFavorites = useCallback(() => {
    const persistFavorite = localStorage.getItem(FAVORITEKEY);
    if (!persistFavorite) {
      return;
    }
    setFavorites(JSON.parse(persistFavorite));
  }, []);

  const handleDelete = useCallback(
    (action: string) => {
      try {
        const savedFavorites = localStorage.getItem(FAVORITEKEY);
        if (savedFavorites) {
          const favorites: string[] = JSON.parse(savedFavorites);
          const index = favorites.indexOf(action);
          if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem(FAVORITEKEY, JSON.stringify(favorites));
            searchFavorites();
            toast.success("Excluido com sucesso");
          }
        }
      } catch (err) {
        toast.error(err || "Erro");
      }
    },
    [searchFavorites]
  );

  useEffect(() => {
    searchFavorites();
  }, [searchFavorites]);

  return (
    <>
      <Grid type={"container"}>
        <Grid type={"item"} xs={3}>
          <ButtonRedirect to="/">Ir para tela anterior</ButtonRedirect>
        </Grid>
      </Grid>
      <Title>ÚLTIMA COTAÇÃO</Title>
      <div>
        {favorites.map((item) => (
          <FavoriteItem handleDelete={handleDelete} actionName={item} />
        ))}
      </div>
    </>
  );
};

export default Favorites;
