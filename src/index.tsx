import { createRoot } from "react-dom/client";
import HttpClient from "./modules/HttpClient";
import RenderModule from "./modules/RenderModule";
const App = () => {
  return (
    <>
      <h1>This is my React app!</h1>
      {/* <HttpClient /> */}
      <RenderModule />
    </>
  );
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);
