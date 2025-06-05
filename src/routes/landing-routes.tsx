import { lazy } from 'react';

// project import
import Loadable from '@/components/utils/loadable';
import MinimalLayout from '@/layout/minimal-layout';
// render - login
const BlogHome = Loadable(lazy(() => import('@/pages/blog/blogs-home')));
 // Blog details
 //
// ==============================|| AUTH ROUTING ||============================== //

const LandingPages = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '',
            element: <BlogHome />,
             
        },
        

    ]
};

export default LandingPages;
