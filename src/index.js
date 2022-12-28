import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import HttpApi from "i18next-http-backend";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { store } from "./store/index";
import App from "./App";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ge"],
    load: "languageOnly",
    fallbackLng: "en",
    detection: {
      order: ["path", "htmlTag", "cookie", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
