import { lazy } from 'react';

// project import
import Loadable from '@/components/utils/loadable';
import AuthLayout from '@/layout/auth-layout';

const AuthSignin = Loadable(lazy(() => import('@/pages/auth/signin')));
const AuthSignup = Loadable(lazy(() => import('@/pages/auth/signup')));
 // ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
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
