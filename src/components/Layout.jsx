import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{ height: "100vh" }}
      >
        <Outlet />
        <footer className="container">2021</footer>
      </Box>
    </>
  );
}
