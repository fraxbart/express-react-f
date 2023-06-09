import './styles/index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Reducers/loginSlice";
import postsReducer from "./Reducers/postsSlice";
import addPostReducer from './Reducers/addNewPostSlice';

const reducer = combineReducers({
  loginState: loginReducer,
  postsState: postsReducer,
  createPostState: addPostReducer
})

const store = configureStore({
  reducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


