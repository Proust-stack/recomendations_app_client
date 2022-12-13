import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/LogoutOutlined";
import { useTranslation } from "react-i18next";
import { signInWithRedirect, getAuth, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";

import { logout } from "../../slices/userSlice";
import { signInGoogle } from "../../slices/userSlice";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const avatarHandleClose = () => {
    setAnchorEl(null);
  };
  const { currentUser } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.locale);
  const dispatch = useDispatch();
  console.log(locale);

  const signInWithGoogle = () => {
    auth.languageCode = locale;
    signInWithRedirect(auth, provider);
  };

  const getUserFromGoogle = async () => {
    const { user } = await getRedirectResult(auth);
    dispatch(signInGoogle(user));
  };

  useEffect(() => {
    getUserFromGoogle();
  }, []);

  const getLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2, mr: 6 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{ width: 32, height: 32, marginRight: 1 }}
          src={currentUser ? currentUser.img : ""}
        ></Avatar>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {currentUser ? currentUser.name : `${t("nav_avatar")}`}
        </Box>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={avatarHandleClose}
        onClick={avatarHandleClose}
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
          <MenuItem onClick={() => navigate(`/mypage/${currentUser._id}`)}>
            <Avatar /> My page
          </MenuItem>
        ) : null}
        {currentUser?.isAdmin ? (
          <MenuItem onClick={() => navigate("/dashboard")}>
            <Avatar /> Dashboard
          </MenuItem>
        ) : null}
        {currentUser ? null : (
          <MenuItem onClick={signInWithGoogle}>{t("nav_google")}</MenuItem>
        )}
        {currentUser ? null : (
          <MenuItem onClick={() => {}}>{t("nav_twitter")}</MenuItem>
        )}
        {currentUser ? (
          <MenuItem onClick={getLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
}
