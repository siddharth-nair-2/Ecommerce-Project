import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <DarkModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeContextProvider>
    </PersistGate>
  </Provider>
);
