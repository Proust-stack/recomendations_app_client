import React from "react";
import RightBar from "../components/RightBar";
import Feed from "../components/Feed";
import { Box, Stack, Skeleton } from "@mui/material";

import cookies from "js-cookie";
import NewReviewForm from "../components/NewReviewForm";

export default function HomePage() {
  const currentLanguageCode = cookies.get("i18next") || "en";
  return (
    <Box
      flex={4}
      p={{ xs: 0, md: 2 }}
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Feed />
      <RightBar />
    </Box>
  );
}
