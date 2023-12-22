import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ children }) => {
  // console.log(children);
  const { user, loading } = useAuth();
  const location = useLocation();
  // console.log(location.pathname);

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user?.email) {
    // console.log(user?.email);
    return children;
  }
  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;
