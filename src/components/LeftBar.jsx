import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Settings,
} from "@mui/icons-material";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../slices/themeSlice";

export default function LeftBar() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const handleSwitch = () => {
    dispatch(changeMode(mode === "light" ? "dark" : "light"));
  };
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", lg: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="admin dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="My Page" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={handleSwitch} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
