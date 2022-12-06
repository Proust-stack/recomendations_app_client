import React from "react";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Feed from "../components/Feed";
import { Stack } from "@mui/material";
import cookies from "js-cookie";

export default function HomePage() {
  const currentLanguageCode = cookies.get("i18next") || "en";
  return (
    <Stack direction={"row"} spacing={2} justifyContent="space-between">
      <LeftBar />
      <Feed />
      <RightBar />
    </Stack>
  );
}
