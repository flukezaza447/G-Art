import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingContextProvider from "./contexts/LoadingContext";
import PostContextProvider from "./contexts/PostContext";
import TagContextProvider from "./contexts/TagContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingContextProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <TagContextProvider>
            <App />
          </TagContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </LoadingContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
