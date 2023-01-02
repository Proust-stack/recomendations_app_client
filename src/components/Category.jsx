import React from "react";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: 10,
  flexWrap: "wrap",
}));

export default function Category({ children, categoryName }) {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h6" color="secondary" sx={{ fontWeight: 300 }}>
        {categoryName}
      </Typography>
      <StyledBox>{children}</StyledBox>
    </>
  );
}
