import { useRoutes } from 'react-router-dom';

// project import
import { useEffect } from 'react';
import { AdminRoutes, UsersRoutes } from './main-routes';
import { useAuth } from '@/context/auth';
import AuthRoutes from './login-routes';
import BlogRoutes from './landing-routes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const authContext = useAuth();
    useEffect(() => {
        // alert(authContext.loadingUser);
        // console.log(authContext.user)
    }, [authContext.user]);

    // Show a loader while checking auth state
const filteredRoutes=[
    // authContext.user ? ((authContext.user?.role ?? 'USER') === 'ADMIN' ? AdminRoutes : UsersRoutes) : {},
    AuthRoutes,
    UsersRoutes,
    BlogRoutes
]
     return useRoutes(filteredRoutes);
}
