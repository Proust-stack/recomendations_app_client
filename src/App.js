import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "./components/Layout";
import AdminPage from "./pages/AdminPage";
import Notfoundpage from "./pages/NotFoundPage";
import PersonalPage from "./pages/PersonalPage";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import BooksPage from "./pages/BooksPage";
import GamesPage from "./pages/GamesPage";
import { useEffect } from "react";
import UsersTable from "./components/admin/UsersTable";
import AddGroupForm from "./components/admin/AddGroupForm";
import AddCompositionForm from "./components/admin/AddCompositionForm";

function App() {
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.theme);
  const { locale } = useSelector((state) => state.locale);
  useEffect(() => {
    document.title = t("nav_title");
  }, [locale, t]);

  const themeWithMode = React.useMemo(
    () =>
      createTheme({
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
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={themeWithMode}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="mypage" element={<PersonalPage />} />
            <Route path="dashboard/*" element={<AdminPage />}>
              <Route path="users" element={<UsersTable />} />
              <Route path="group" element={<AddGroupForm />} />
              <Route path="composition" element={<AddCompositionForm />} />
            </Route>
            <Route path="*" element={<Notfoundpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
