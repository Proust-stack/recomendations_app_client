import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

export default function AppNameTitle() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Typography
      variant="h6"
      sx={{
        display: { xs: "none", sm: "flex" },
        cursor: "pointer",
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        textDecoration: "none",
      }}
      color={"text.primary"}
      onClick={() => navigate("/")}
    >
      {t("nav_title")}
    </Typography>
  );
}
