import { Outlet } from "react-router-dom";
import  useSession  from '../hook/useSession.js';
import Login from '../Pages/Login';

const ProtectedRoutes = () => {
  const session = useSession();
  return session ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
