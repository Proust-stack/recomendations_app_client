import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AdminPage from "./pages/AdminPage";
import Notfoundpage from "./pages/NotFoundPage";
import PersonalPage from "./pages/PersonalPage";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
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
