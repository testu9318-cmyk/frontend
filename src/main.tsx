import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TanStackProvider from "./providers/TanStackProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TanStackProvider>
      <App />
    </TanStackProvider>
  </React.StrictMode>
);
