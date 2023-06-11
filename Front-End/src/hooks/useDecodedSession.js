import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

const useDecodedSession = () => {
    const session = JSON.parse(localStorage.getItem('loggedIn'))
    const [decodedSession, setDecodedSession] = useState(null)

    useEffect(() => {
        if (session) {
            const decodedSession = jwt_decode(session.token)
            setDecodedSession(decodedSession)
        }
    }, [])
    return decodedSession
}

export default useDecodedSession