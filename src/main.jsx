import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import AppLayout from "./layout/AppLayout.jsx";
import en from "@shopify/polaris/locales/en.json";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider i18n={en}>
            <AppLayout>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AppLayout>
        </AppProvider>
    </React.StrictMode>
);
