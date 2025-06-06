import { lazy } from "react";
import Loadable from "@/components/utils/loadable";
import MainLayout from "@/layout/main-layout";

const UsersFavourite = Loadable(
  lazy(() => import("@/pages/blog/guard/user-blog"))
);
const ProfilePage = Loadable(lazy(() => import("@/pages/users/profile-management/index")));
// const EditProfile = Loadable(lazy(() => import("@/pages/users/profile-management/edit")));
const NewPost = Loadable(lazy(() => import("@/pages/blog/guard/new-post")));
const MyPosts = Loadable(lazy(() => import("@/pages/blog/guard/my-posts")));
const NewAuthor = Loadable(lazy(() => import("@/pages/blog/guard/new-author")));
const NewBlog = Loadable(lazy(() => import("@/pages/blog/guard/new-blog")));
const UsersBlogs = Loadable(lazy(() => import("@/pages/blog/guard/user-blog")));
const BlogsPosts = Loadable(lazy(() => import("@/pages/blog/guard/user-blog")));

const UsersRoutes = {
  path: "/my-account",
  element: <MainLayout />,
  children: [
    {
      path: "", //favourite-blogs
      element: <UsersFavourite />,
    },
    {
      path: "blogs",
      // element: , // list or grid of blogs
      children: [
        {
          path: "",
          element: <UsersBlogs />,
        },
        {
          path: "new",
          element: <NewBlog />,
        },
        {
          path: "",
          paramKey: "blogid",
          element: <BlogsPosts />, // list individual blog with list of posts
          children: [
            {
              path: "posts",
              paramKey: "blogid",
              element: <BlogsPosts />, // see a blog post you made
            },
          ],
        },
      ],
    },
    {
      path: "posts",
      // element: <Posts />,
      children: [
        {
          path: "",
          element: <MyPosts />,
        },
        {
          path: "new",
          element: <NewPost />,
        },
      ],
    },
    {
      path: "become-an-author",
      element: <NewAuthor />,
    },
    {
      path: "profile",
      // element: <Posts />,
      children: [
        {
          path: "",
          element: <ProfilePage />,
        },
        
      ],
    },
  ],
};

const AdminRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [],
};

export { AdminRoutes, UsersRoutes };
