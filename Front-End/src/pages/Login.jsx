
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginLoading, loginResponse, loginRequest } from "../Reducers/loginSlice"
import { Toast } from '../utilities/notifications.js'
import { Toaster } from "react-hot-toast"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const successToast = new Toast("Login effettuato con successo!")
    const errorToast = new Toast("Login fallito")


    const doLogin = async (e) => {
        e.preventDefault();
        dispatch(loginRequest(formData))
            .then((action) => {
                if (action.payload && action.payload.token) {
                    successToast.success();
                    setTimeout(() => {
                        navigate("/home", { replace: true });
                    }, 1500);
                } else {
                    errorToast.warning();
                }
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <Container className="d-flex justify-content-center mt-3">
                <Card style={{ width: '18rem' }} className="d-flex justify-content-center mt-5 shadow">
                    <Card.Img variant="top" src="https://cdn.learnwoo.com/wp-content/uploads/2019/11/image1-5.jpg" />
                    <Card.Body className="d-flex justify-content-center">
                        <Toaster
                            position="bottom-center" reverseOrder={false} />
                        <Form onSubmit={doLogin}>
                            <Form.Control
                                onChange={handleInputChange}
                                name="email"
                                type="email"
                                placeholder="Inserisci email..."
                                className="my-2"
                            />
                            <Form.Control
                                onChange={handleInputChange}
                                name="password"
                                type="password"
                                placeholder="Inserisci password..."
                                className="my-2"
                            />
                            <div className="d-grid gap-2">
                                <Button variant="outline-success" size="sm" type="submit" className="my-1">Login</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container >
        </>
    )
}

export default Login
