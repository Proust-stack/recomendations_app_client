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
  IconButton,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { Logout } from "@mui/icons-material";
import { loginSuccess } from "../slices/userSlice";
import { signInGoogle } from "../http/userAPI";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    const {
      user: { displayName, email, photoURL },
    } = await signInWithPopup(auth, provider);

    const user = await signInGoogle(displayName, email, photoURL);
    console.log(user);
    dispatch(loginSuccess(user));
  };
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
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32, marginRight: 1 }}
            src={currentUser ? currentUser.img : ""}
          >
            M
          </Avatar>
          {currentUser ? currentUser.name : "User"}
        </IconButton>
      </StyledToolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {currentUser ? (
          <MenuItem>
            <Avatar /> My page
          </MenuItem>
        ) : null}
        {currentUser ? null : (
          <MenuItem onClick={signInWithGoogle}>sign in with google</MenuItem>
        )}
        {currentUser ? null : (
          <MenuItem onClick={() => {}}>sign in with twitter</MenuItem>
        )}
        {currentUser ? (
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : null}
      </Menu>
    </AppBar>
  );
}
