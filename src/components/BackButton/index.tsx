import React from "react";
import { Button, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  sx: SxProps;
};

export const BackBtn = ({ sx }: BackButtonProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="contained" sx={sx} onClick={goBack}>
      ❰ Back
    </Button>
  );
};
