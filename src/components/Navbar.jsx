import {
  AppBar,
  Avatar,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
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
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <AppBar>
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" } }}
          color={"text.primary"}
        >
          What ever
        </Typography>
        <Search>
          <InputBase placeholder="search..." color={"text.primary"} />
        </Search>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30 }} />
          <Typography variant="span">User</Typography>
        </UserBox>
        <Avatar
          sx={{ width: 30, height: 30, cursor: "pointer" }}
          onClick={(e) => setOpen(true)}
        />
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>My page</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>{currentUser ? "logout" : "login"}</MenuItem>
      </Menu>
    </AppBar>
  );
}
