import { lazy } from 'react';

// project import
import Loadable from '@/components/utils/loadable';
import AuthLayout from '@/layout/auth-layout';
import { Navigate } from 'react-router-dom';

const AuthSignin = Loadable(lazy(() => import('@/pages/auth/signin')));
const AuthSignup = Loadable(lazy(() => import('@/pages/auth/signup')));
 // ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: '',
            element: <Navigate to={"signin"}/>
        },
        {
            path: 'signin',
            element: <AuthSignin />
        },
        {
            path: 'signup',
            element: <AuthSignup />
        }
    ]
};

export default LoginRoutes;
