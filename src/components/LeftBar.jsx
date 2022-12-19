import { Article, Group, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <Box flex={1} p={2} sx={{ display: "flex", flexDirection: "column" }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"users"}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={t("dashboard_users")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"group"}>
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary={t("dashboard_add_group")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"composition"}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary={t("dashboard_add_composition")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
