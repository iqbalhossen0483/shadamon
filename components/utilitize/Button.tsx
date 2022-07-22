import React from "react";
import { Button as MaterialButton } from "@mui/material";

type Props = {
  children: string;
  variant?: "text" | "outlined" | "contained" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = ({ children, variant, onClick }: Props) => {
  return (
    <MaterialButton
      style={{ backgroundColor: "#1976d2" }}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
