import { Divider } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components/Button";
import { ButtonRedirect } from "../../../components/ButtonRedirect";
import { Grid } from "../../../components/Grid";
import { LineItem } from "../../../components/LineItem";
import api from "../../../services/api";
import { formatDateTime, formatPrice } from "../../../utils";

interface PriceLastAction {
  name: string;
  lastPrice: number;
  pricedAt: string; // data e hora no formato ISO 8601, UTC
}

interface ActionNameProps {
  actionName: string;
  handleDelete: Function;
}

export const FavoriteItem = ({ actionName, handleDelete }: ActionNameProps) => {
  const [stock, setStock] = useState<PriceLastAction>({} as PriceLastAction);

  const actionsSearch = useCallback(async () => {
    try {
      const { data } = await api.get(`/stocks/${actionName}/quote`);
      setStock(data);
    } catch (err) {
      toast.error(err || "Erro");
    } finally {
    }
  }, [actionName]);

  useEffect(() => {
    actionsSearch();
  }, [actionsSearch]);

  return (
    <div>
      <Grid type={"container"}>
        <LineItem xs={2}>{actionName}</LineItem>
        <LineItem xs={3}>
          {stock.lastPrice
            ? `Preço: ${formatPrice(stock.lastPrice)}`
            : "Buscando..."}
        </LineItem>
        <LineItem xs={3}>
          {stock.pricedAt
            ? `Data: ${formatDateTime(stock.pricedAt)}`
            : "Buscando..."}
        </LineItem>
        <Grid type={"item"} xs={1}>
          <ButtonRedirect
            variant={"outlined"}
            size={"small"}
            to={`historic/${actionName}`}
          >
            Historico
          </ButtonRedirect>
        </Grid>
        <Grid type={"item"} xs={2}>
          <ButtonRedirect
            variant={"outlined"}
            size={"small"}
            to={`/gains/${actionName}`}
          >
            Projeção de ganhos
          </ButtonRedirect>
        </Grid>
        <Grid type={"item"} xs={1}>
          <Button
            onClick={() => handleDelete(actionName)}
            variant={"outlined"}
            size={"small"}
            color={"secondary"}
          >
            Excluir
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default FavoriteItem;
