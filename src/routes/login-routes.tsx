import { lazy } from 'react';

// project import
import Loadable from '@/components/utils/loadable';
import MinimalLayout from '@/layout/minimal-layout';

const AuthSignin = Loadable(lazy(() => import('@/pages/auth/signin')));
const AuthSignup = Loadable(lazy(() => import('@/pages/auth/signup')));
 // ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/auth',
    element: <MinimalLayout />,
    children: [
        {
            path: 'signin',
            element: <AuthSignin />
        },
        {
            path: 'singup',
            element: <AuthSignup />
        }
    ]
};

export default LoginRoutes;
