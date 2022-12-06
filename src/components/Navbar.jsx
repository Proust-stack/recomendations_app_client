import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import React from "react";
import { styled } from "@mui/material/styles";

import SelectSmall from "./ui/SelectSmall";
import ProfileMenu from "./ui/ProfileMenu";
import NavLinks from "./NavLinks";
import SearchComponent from "./ui/SearchComponent";
import AppNameTitle from "./ui/AppNameTitle";
import SmallMenu from "./ui/SmallMenu";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export default function Navbar() {
  return (
    <AppBar color="primary" position="sticky">
      <StyledToolbar>
        <AppNameTitle />
        <SearchComponent />
        <Box sx={{ display: "flex" }}>
          <NavLinks />
          <SmallMenu />
          <SelectSmall />
          <ProfileMenu />
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
