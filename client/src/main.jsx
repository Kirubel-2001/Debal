import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "325532067427-tpp2iobse43tj299sl9s2hqjrute0c8l.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  // <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  /* </GoogleOAuthProvider> */
);
