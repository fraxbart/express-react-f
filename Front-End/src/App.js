import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import UserList from './pages/UserList.jsx'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoutes from "./Middleware/ProtectedRoutes.js"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={'/'} element={<Login />} />
        <Route path={'/users'} element={<UserList />} />
        <Route element={<ProtectedRoutes />} >
          <Route path={'/home'} element={<Home />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
