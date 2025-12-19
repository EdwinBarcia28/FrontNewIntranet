import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";
 
export const RedirectAuth = () => {
  const { isAuth} = useAuthStore();

  if (isAuth) {
    // if (!selectEstablishments)
    //   return <Navigate to="/establecimiento" replace />;
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
};
