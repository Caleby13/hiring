import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { ButtonRedirect } from "../../components/ButtonRedirect";
import { Divider } from "../../components/Divider";
import { Grid } from "../../components/Grid";
import { LineItem } from "../../components/LineItem";
import { Loading } from "../../components/Loading";
import { TextField } from "../../components/TextField";
import api from "../../services/api";

const Home: React.FC = () => {
  const FAVORITEKEY = "@favorites";

  const [keywords, setKeywords] = useState("");
  const [rows, setRows] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = useCallback(
    (item: string) => {
      const exist = favorites.find((prevFavorites) => prevFavorites === item);
      if (exist) {
        return;
      }
      setFavorites((prev) => [item, ...prev]);
    },
    [favorites]
  );

  const searchEndpoint = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/stocks/searchEndpoint/${keywords}`);
      setRows(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [keywords]);

  useEffect(() => {
    const persistFavorite = localStorage.getItem(FAVORITEKEY);
    if (!persistFavorite) {
      return;
    }
    setFavorites(JSON.parse(persistFavorite));
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITEKEY, JSON.stringify(favorites));
  }, [favorites]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid type={"container"} spacing={1}>
        <TextField
          xs={8}
          placeHolder={"Insira o nome da ação desejada. Ex: PETR4.SA, VALE5.SA"}
          label={"Nome da ação"}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <Grid type={"item"} xs={2}>
          <Button onClick={searchEndpoint}>Buscar</Button>
        </Grid>
        <Grid type={"item"} xs={2}>
          <ButtonRedirect to="/favorites">Favoritos</ButtonRedirect>
        </Grid>
      </Grid>
      {rows.map((item) => (
        <>
          <Grid type={"container"} xs={12}>
            <LineItem xs={3}>{item}</LineItem>
            <Grid type={"item"} xs={3}>
              <Button
                onClick={() => {
                  addFavorite(item);
                }}
                size={"small"}
                variant={"outlined"}
              >
                Add Favoritos
              </Button>
            </Grid>
          </Grid>
          <Divider />
        </>
      ))}
    </>
  );
};

export default Home;
