import React, { ReactNode } from "react";
import { Grid } from "../Grid";

interface ILineItem {
  children: ReactNode;
  xs:
    | boolean
    | 2
    | 1
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | "auto"
    | 11
    | 12
    | undefined;
}

export const LineItem = ({ children, xs }: ILineItem) => {
  return (
    <Grid type={"item"} xs={xs}>
      <div>
        <h3>{children}</h3>
      </div>
    </Grid>
  );
};
