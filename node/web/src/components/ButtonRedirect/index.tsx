import { ReactNode, MouseEventHandler } from "react";
import { Button as ButtonMaterial } from "@material-ui/core";
import { Link } from "react-router-dom";

interface IButton {
  children: ReactNode;
  color?: "default" | "inherit" | "primary" | "secondary";
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  to?: string;
}

export const ButtonRedirect = ({
  children,
  color = "primary",
  onClick,
  variant = "contained",
  size = "medium",
  to = "",
}: IButton) => (
  <div style={{ marginTop: "15px" }}>
    <Link to={to} style={{ textDecoration: "none" }}>
      <ButtonMaterial
        size={size}
        fullWidth
        color={color}
        onClick={onClick}
        variant={variant}
      >
        {children}
      </ButtonMaterial>
    </Link>
  </div>
);
