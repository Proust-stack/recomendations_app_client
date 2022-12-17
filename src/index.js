import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import HttpApi from "i18next-http-backend";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { PersistGate } from "redux-persist/integration/react";

import { store } from "./store/index";
import App from "./App";
import "./index.css";
import Loader from "./components/ui/Loader";

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ge"],
    load: "languageOnly",
    fallbackLng: "en",
    detection: {
      order: ["cookie", "path", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Provider>
);
