import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store";

import "./styles/index.css";

import App from "./components/App/App";

const redirect = sessionStorage.getItem("redirect");
if (redirect) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/the-biggest-store">
      <App />
    </BrowserRouter>
  </Provider>,
);
