import { createRoot } from "react-dom/client";
import React from "react";
import HttpClient from "./modules/HttpClient";
const App = () => {
  return (
    <>
      <h1>This is my React app!</h1>
      <HttpClient />
    </>
  );
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);
