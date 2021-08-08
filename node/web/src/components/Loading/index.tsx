import { Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";

export const Loading = () => {
  return (
    <Backdrop style={{ zIndex: 999, color: "#fff" }} open>
      <CircularProgress />
    </Backdrop>
  );
};
