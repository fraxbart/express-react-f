import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Reducers/loginSlice";
import postsReducer from "./Reducers/postsSlice";

const reducer = combineReducers({
  loginState: loginReducer,
  postsState: postsReducer,
});

const store = configureStore({
  reducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
