import { fetchBlogsByAuthorId } from "@/api/blog";
import type { AppContextType, Author, Blog, BlogPost, User } from "@/types";
import { createContext, useContext, useRef, useState } from "react";
import { useOnUserAvailable } from "../auth";
import { fetchBlogPostsByAuthorId } from "@/api/blog-post";

// AppContext.tsx
const AppContext = createContext<AppContextType>({
  blogPosts: [],
  blogs: [],
  authorInfo: undefined,
  favouriteBlogs: undefined,
  isLoading: false,
  initializeApp: async (_user: User) => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [authorInfo, setAuthorInfo] = useState<Author | undefined>(undefined);
  const [favouriteBlogs, setFavouriteBlogs] = useState<Blog[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const initializedRef = useRef(false);

  async function initBlogPosts(user: User) {
    try {
      const blogPostsByAuthor = await fetchBlogPostsByAuthorId(
        user.authorsInfo?.objectId as string
      );
      setBlogPosts(blogPostsByAuthor);
    } catch (e) {
      console.error("Error fetching blogs:", e);

      setBlogPosts([]);
    }
  }

  async function initBlogs(user: User) {
    try {
      const blogsByAuthor = await fetchBlogsByAuthorId(
        user.authorsInfo?.objectId as string
      );
      setBlogs(blogsByAuthor);
    } catch (e) {
      console.error("Error fetching blogs:", e);

      setBlogs([]);
    }
  }
  const initializeApp = async (user: User) => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (user && user.authorsInfo && user.authorsInfo.objectId) {
      setIsLoading(true);
      setAuthorInfo(user.authorsInfo);
      try {
        initBlogPosts(user);
        initBlogs(user);
      } catch (e) {
        setIsLoading(false);
      } finally {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }
    }
  };

  useOnUserAvailable((user) => {
    initializeApp(user);
  });

  return (
    <AppContext.Provider
      value={{
        blogPosts,
        blogs,
        authorInfo,
        favouriteBlogs,
        isLoading,
        initializeApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
