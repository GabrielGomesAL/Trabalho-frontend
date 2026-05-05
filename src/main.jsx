import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ClientesProvider } from "./context/ClientesContext.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClientesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClientesProvider>
  </React.StrictMode>,
);
