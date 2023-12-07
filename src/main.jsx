import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider i18n={{}}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>
);
