import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../../slices/themeSlice";

export default function ModeButton() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const handleSwitch = () => {
    dispatch(changeMode(mode === "light" ? "dark" : "light"));
  };
  return (
    <IconButton sx={{ ml: 1 }} onClick={handleSwitch} color="inherit">
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
