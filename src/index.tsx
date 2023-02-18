import { createRoot } from "react-dom/client";
import Routes from "./routes";

const App = () => {
  return <Routes />;
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);
