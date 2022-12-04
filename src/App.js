import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { useState } from "react";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Feed from "./components/Feed";
import { theme } from "./theme";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";

function App() {
  const { mode } = useSelector((state) => state.theme);

  const themeWithMode = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={themeWithMode}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
