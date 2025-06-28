import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { DataPipelineProvider } from "./DataPipelineContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataPipelineProvider>
    <App />
  </DataPipelineProvider>
);
