import { useRoutes } from "react-router-dom";

// project import
import { useApp } from "@/context/app";
import { useAuth } from "@/context/auth";
import { useEffect } from "react";
import AuthRoutes from "./auth-routes";
import BlogRoutes from "./landing-routes";
import { UsersRoutes } from "./main-routes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
//   const authContext = useAuth();
//   const appContext = useApp();
//   useEffect(() => {
//   }, [authContext, appContext]);


  // Show a loader while checking auth state
  const filteredRoutes = [
    // authContext.user ? ((authContext.user?.role ?? 'USER') === 'ADMIN' ? AdminRoutes : UsersRoutes) : {},
    AuthRoutes,
    UsersRoutes,
    BlogRoutes,
  ];
  
  return useRoutes(filteredRoutes);
}
