import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import NewReviewForm from "./NewReviewForm";

export default function Feed({ children }) {
  return (
    <Box
      flex={4}
      p={{ xs: 0, md: 2 }}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* <Skeleton variant="text" height={100} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="rectangular" height={300} /> */}
      {children}
    </Box>
  );
}
