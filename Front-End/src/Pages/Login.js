import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginLoading,
  loginResponse,
  loginRequest,
} from "../Reducers/loginSlice";
import "../styles/login.css";
import { Toast } from "../utilities/notifications";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successToast = new Toast("Login effettuato con successo!");
  const errorToast = new Toast("Login fallito");

  const post = async (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData)).then((action) => {
      if (action.payload && action.payload.token) {
        successToast.success();
        // Salva token in local storage
        localStorage.setItem("auth", JSON.stringify(action.payload.token));
        // Naviga a home
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1500);
      } else {
        errorToast.error();
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="box">
        <Form className="m-5" onSubmit={post}>
          <h2>Sign in</h2>
          <Form.Control
            onChange={handleInputChange}
            name="email"
            type="email"
            placeholder="Inserisci email..."
            className="form my-2"
          />

          <Form.Control
            onChange={handleInputChange}
            name="password"
            type="password"
            placeholder="Inserisci password..."
            className="my-2"
          />
          <div className="links">
            <a href="#">Forgot Password</a>
            <a href="#">Signup</a>
          </div>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
