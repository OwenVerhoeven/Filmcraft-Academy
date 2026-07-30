import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "./router";
import { App } from "./App";
import { ProgressProvider } from "./state";
import { AuthProvider } from "./auth";
import { LanguageProvider } from "./i18n";
import "./styles/app.css";
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("Offline support could not start", error);
    });
  });
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
