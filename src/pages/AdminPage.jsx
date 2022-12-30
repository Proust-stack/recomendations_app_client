import React, { Suspense } from "react";
import Grid from "@mui/material/Grid";
import { ErrorBoundary } from "react-error-boundary";
import { Box } from "@mui/material";

import LeftBar from "../components/LeftBar";
import { Outlet } from "react-router-dom";
import Loader from "../components/ui/Loader";
import ErrorFallback from "../utils/errorCallback";

export default function AdminPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <LeftBar />
          </Grid>
          <Grid item xs>
            <Box
              sx={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
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
