import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./proofs/redux/toolkit/store";
import Routes from "./routes";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);
