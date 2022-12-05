import React from "react";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Feed from "../components/Feed";
import { Stack } from "@mui/material";

export default function HomePage() {
  return (
    <Stack direction={"row"} spacing={2} justifyContent="space-between">
      <LeftBar />
      <Feed />
      <RightBar />
    </Stack>
  );
}
