import { lazy } from "react";
import Loadable from "@/components/utils/loadable";
import MainLayout from "@/layout/main-layout";

const UsersSavedBlogs = Loadable(lazy(() => import("@/pages/blog/guard/user-blog")));
const UsersBlogs = Loadable(lazy(() => import("@/pages/auth/signin")));
const BlogsPosts = Loadable(lazy(() => import("@/pages/auth/signin")));

const UsersRoutes  = {
  path: "/my-account",
  element: <MainLayout />,
  children: [
    {
      path: "",//favourite-blogs
      element: <UsersSavedBlogs />,
    },
    {
      path: "blogs",
      element: <UsersBlogs />,// list or grid of blogs
      children: [
        {
          path: "",
          paramKey: "blogid",
          element: <BlogsPosts />,// list individual blog with list of posts
          children: [
            {
              path: "posts",
              paramKey: "blogid",
              element: <BlogsPosts />,// see a blog post you made
            },
          ],
        },
      ],
    },
     
  ],
};

const AdminRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
 
  ],
};

export { AdminRoutes, UsersRoutes };
