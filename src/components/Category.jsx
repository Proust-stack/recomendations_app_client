import React from "react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: 10,
  flexWrap: "wrap",
}));

export default function Category({ children }) {
  return <StyledBox>{children}</StyledBox>;
}
