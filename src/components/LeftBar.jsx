import { Article, Group, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

export default function LeftBar() {
  return (
    <Box flex={1} p={2} sx={{ display: "flex", flexDirection: "column" }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"users"}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"group"}>
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Add group" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"composition"}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Add composition" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
