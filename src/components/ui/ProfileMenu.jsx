import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/LogoutOutlined";
import { useTranslation } from "react-i18next";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";

import firebaseConfig from "../../utils/firebase";
import { logout, setUser } from "../../slices/userSlice";
import { signInGoogle } from "../../slices/userSlice";

export default function ProfileMenu() {
  let auth;
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
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
  const { reviews } = useSelector((state) => state.review);
  const { locale } = useSelector((state) => state.locale);
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    auth.languageCode = locale;
    signInWithRedirect(auth, googleProvider);
  };
  const signInWithGithub = () => {
    auth.languageCode = locale;
    signInWithRedirect(auth, githubProvider);
  };

  const getUserFromGoogle = async () => {
    const response = await getRedirectResult(auth);
    if (response?.user) {
      dispatch(signInGoogle(response.user));
    }
  };

  useEffect(() => {
    if (currentUser.blocked) {
      getLogout();
    }
  }, [currentUser]);

  useEffect(() => {
    initializeApp(firebaseConfig);
    auth = getAuth();
    getUserFromGoogle();
  }, []);

  const getLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2, mr: 1 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={currentUser ? currentUser.img : ""}
          >
            P
          </Avatar>
        </IconButton>
        <Typography color={"text.primary"} sx={{ mr: 1 }}>
          {reviews && reviews.map((rewiew) => rewiew.likes.length).length}❤️
        </Typography>
        <Typography
          sx={{ display: { xs: "none", md: "flex" } }}
          color={"text.primary"}
        >
          {currentUser ? currentUser.name : `${t("nav_avatar")}`}
        </Typography>
      </Box>
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
        {currentUser && !currentUser.blocked ? (
          <MenuItem onClick={() => navigate(`/mypage/${currentUser._id}`)}>
            <Avatar /> {t("nav_mypage")}
          </MenuItem>
        ) : null}
        {currentUser?.isAdmin ? (
          <MenuItem onClick={() => navigate("/dashboard")}>
            <Avatar /> {t("nav_dashboard")}
          </MenuItem>
        ) : null}
        {currentUser && !currentUser.blocked ? null : (
          <MenuItem onClick={signInWithGoogle}>{t("nav_google")}</MenuItem>
        )}
        {currentUser && !currentUser.blocked ? null : (
          <MenuItem onClick={signInWithGithub}>{t("nav_twitter")}</MenuItem>
        )}
        {currentUser ? (
          <MenuItem onClick={getLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t("nav_logout")}
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
}
