import React from "react";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Feed from "../components/Feed";
import { Box, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";

export default function HomePage() {
  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ height: "100vh" }}
    >
      <Navbar />
      <Stack direction={"row"} spacing={2} justifyContent="space-between">
        <LeftBar />
        <Feed />
        <RightBar />
      </Stack>
    </Box>
  );
}
