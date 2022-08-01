import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
//import { VideoListContextProvider } from "./context/VideoListContext";
import { BrowserRouter } from "react-router-dom";
//import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
