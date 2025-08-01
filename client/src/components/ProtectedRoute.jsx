import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthLoading, selectIsAuthenticated } from "../reducx/authSlice";
import Spinner from "./Spinner";
import { FetchCsrfToken } from "../services/api";

// Protected Route wrapper component
const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const isLoading = useSelector(selectAuthLoading);
FetchCsrfToken()
  // Show loading state while checking authentication
  // if (isLoading) {
  //   return <div><Spinner /></div>;
  // }
  // You can replace this with a proper loading component

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute