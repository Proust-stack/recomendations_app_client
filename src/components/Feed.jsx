import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";

export default function Feed() {
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Stack spacing={1}>
        <Skeleton variant="text" height={100} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="rectangular" height={300} />
      </Stack>
    </Box>
  );
}
