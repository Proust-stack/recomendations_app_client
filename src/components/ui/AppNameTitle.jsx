import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
}));

export default function AppNameTitle() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <StyledBox>
      <Typography
        variant="h6"
        sx={{
          display: { xs: "none", sm: "flex" },
          cursor: "pointer",
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
        }}
        color={"secondary"}
        onClick={() => navigate("/")}
      >
        {t("nav_title")}
      </Typography>
      <RemoveRedEyeIcon color={"secondary"} />
    </StyledBox>
  );
}
