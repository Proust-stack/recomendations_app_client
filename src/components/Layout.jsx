import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ErrorFallback from "../utils/errorCallback";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Loader from "./ui/Loader";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
        <Footer />
      </Box>
    </>
  );
}
