import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { VideoListContextProvider } from "./context/VideoListContext";
import { BrowserRouter } from "react-router-dom";
VideoListContextProvider;

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoListContextProvider>
        <App />
      </VideoListContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
