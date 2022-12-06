import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "./components/Layout";
import AdminPage from "./pages/AdminPage";
import Notfoundpage from "./pages/NotFoundPage";
import PersonalPage from "./pages/PersonalPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";

function App() {
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.theme);
  const { locale } = useSelector((state) => state.locale);
  useEffect(() => {
    document.title = t("nav_title");
  }, [locale, t]);

  const themeWithMode = createTheme({
    palette: {
      mode: mode,
      primary: {
        light: "#757ce8",
        main: "#26c6da",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#00b0ff",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={themeWithMode}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<PersonalPage />} />
            <Route path="books" element={<PersonalPage />} />
            <Route path="games" element={<PersonalPage />} />
            <Route path="personal" element={<PersonalPage />} />
            <Route path="dashboard" element={<AdminPage />} />
            <Route path="*" element={<Notfoundpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
