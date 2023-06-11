//questo componente fa si che se si sbaglia il login si resti sulla pagina login anzichè restare sul login ma con la barra degli indirizzi valorizzata a http://localhost:3000/home
import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate, useLocation } from 'react-router-dom'

const useSession = () => {
    const session = JSON.parse(localStorage.getItem('loggedIn'))
    const decodedSession = session ? jwt_decode(session.token) : null

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) {
            navigate('/', { replace: true })
        }
        if (session && location.pathname !== '/') {
            return
        }
        navigate('/home', { replace: true })
    }, [navigate, session])
    return decodedSession
}

export default useSession