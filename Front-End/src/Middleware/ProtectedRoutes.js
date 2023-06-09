import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { Toast } from '../utilities/notifications.js'
import { Toaster } from "react-hot-toast"


const useAuth = () => {
    const session = JSON.parse(localStorage.getItem("loggedIn"));
    return session //togliendo ?.token marco ha risolto
}

//const errorToast = new Toast("Login fallito")

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const isAuthorized = useAuth();
    useEffect(() => {
        if (!isAuthorized) {
            navigate('/')
        }
    }, [])
    return <Outlet /> 
}

export default ProtectedRoutes