import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from './App';
import { Provider } from "react-redux";
import configureStore from "./redux/store";

const contianer = document.getElementById('root');
const root = createRoot(contianer);

root.render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

