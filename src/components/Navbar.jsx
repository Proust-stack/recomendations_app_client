import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import React from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import SelectSmall from "./ui/SelectSmall";
import ProfileMenu from "./ui/ProfileMenu";
import NavLinks from "./NavLinks";
import SearchComponent from "./ui/SearchComponent";
import AppNameTitle from "./ui/AppNameTitle";
import SmallMenu from "./ui/SmallMenu";
import ModeButton from "./ui/ModeButton";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../utils/errorCallback";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  fontSize: "10px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Navbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppBar color="primary" position="relative">
        <StyledToolbar>
          <AppNameTitle />
          <SearchComponent />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {matches && <NavLinks />}
            <SmallMenu />
            <SelectSmall />
            <ModeButton />
            <ProfileMenu />
          </Box>
        </StyledToolbar>
      </AppBar>
    </ErrorBoundary>
  );
}
