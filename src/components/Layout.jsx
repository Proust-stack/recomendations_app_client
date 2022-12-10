import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}
