import React, { useState } from "react";
import { useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { ButtonRedirect } from "../../components/ButtonRedirect";
import { DatePickers } from "../../components/DatePickers";
import { Divider } from "../../components/Divider";
import { Grid } from "../../components/Grid";
import { LineItem } from "../../components/LineItem";
import { Loading } from "../../components/Loading";
import api from "../../services/api";

interface HistoricProps {
  actionName: string;
}

interface StockHistory {
  name: string;
  prices: PriceHistory[];
}

interface PriceHistory {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string; // data no formato ISO 8601, UTC
}

const Historic: React.FC = () => {
  const { params } = useRouteMatch<HistoricProps>();
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const searchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get<StockHistory>(
        `/stocks/${params.actionName}/history`,
        {
          params: {
            to: toDate,
            from: fromDate,
          },
        }
      );
      setPriceHistory(data.prices);
    } catch (err) {
      toast.error(err || "Erro");
    } finally {
      setLoading(false);
    }
  }, [params.actionName, toDate, fromDate]);

  if (loading) {
    <Loading />;
  }

  return (
    <>
      <Grid type={"container"}>
        <Grid type={"item"} xs={3}>
          <ButtonRedirect to="/favorites">Ir para tela anterior</ButtonRedirect>
        </Grid>
      </Grid>
      <Grid type={"container"} justifyContent={"flex-start"}>
        <Grid type={"item"} xs={2}>
          <DatePickers
            label="Data Final"
            onChange={(e) => {
              setFromDate(e.target.value);
            }}
          />
        </Grid>
        <Grid type={"item"} xs={2}>
          <DatePickers
            label="Data Final"
            onChange={(e) => {
              setToDate(e.target.value);
            }}
          />
        </Grid>
        <Grid type={"item"} xs={4}>
          <Button onClick={searchHistory}>Buscar Registros</Button>
        </Grid>
      </Grid>
      {priceHistory.map((item) => (
        <>
          <Grid type={"container"}>
            <LineItem xs={2}>{item.opening}</LineItem>
            <LineItem xs={2}>{item.closing}</LineItem>
            <LineItem xs={2}>{item.low}</LineItem>
            <LineItem xs={2}>{item.high}</LineItem>
            <LineItem xs={2}>{item.pricedAt}</LineItem>
          </Grid>
          <Divider />
        </>
      ))}
    </>
  );
};

export default Historic;
