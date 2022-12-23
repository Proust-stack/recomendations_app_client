import { Article, Group, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"users"}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={matches ? null : t("dashboard_users")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"group"}>
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText
                primary={t(matches ? null : "dashboard_add_group")}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"composition"}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText
                primary={t(matches ? null : "dashboard_add_composition")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
