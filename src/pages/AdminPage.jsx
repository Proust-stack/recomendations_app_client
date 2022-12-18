import React, { Suspense } from "react";
import Grid from "@mui/material/Grid";
import LeftBar from "../components/LeftBar";
import { Outlet } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";
import { Box } from "@mui/material";

export default function AdminPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <LeftBar />
          </Grid>
          <Grid item xs={10}>
            <Box
              p={{ xs: 0, md: 2 }}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Suspense>
    </ErrorBoundary>
  );
}
