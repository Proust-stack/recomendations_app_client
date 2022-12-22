import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { useTranslation } from "react-i18next";

const pages = [
  { genre: "nav_home", path: "/" },
  { genre: "nav_movies", path: "movies" },
  { genre: "nav_books", path: "books" },
  { genre: "nav_games", path: "games" },
];

const ITEM_HEIGHT = 48;

const StyledBox = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export default function SmallMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledBox>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {pages.map((page, i, array) => (
          <MenuItem
            key={page.genre}
            onClick={handleClose}
            component={Link}
            to={page.path}
          >
            {t(page.genre)}
          </MenuItem>
        ))}
      </Menu>
    </StyledBox>
  );
}
