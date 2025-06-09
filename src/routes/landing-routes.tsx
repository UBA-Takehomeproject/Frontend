import { lazy } from 'react';

// project import
import Loadable from '@/components/utils/loadable';
import MinimalLayout from '@/layout/minimal-layout';

const BlogPostPage = Loadable(lazy(() => import("@/pages/blog/post-details")));
const BlogHome = Loadable(lazy(() => import('@/pages/blog/blogs-home')));
const BlogDetails = Loadable(lazy(() => import('@/pages/blog/blog-details')));
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
             
        }
        ,
        {
          path: "blog-post",
          paramKey: "postid",
          element: <BlogPostPage />,
        },
        ,
        {
          path: "blog",
          paramKey: "blogid",
          element: <BlogDetails />,
        },

    ]
};

export default LandingPages;
