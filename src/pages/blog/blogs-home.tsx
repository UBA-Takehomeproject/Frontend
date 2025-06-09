import BlogPostCard from "@/components/blog/blog-post";
import TopBar from "@/components/custom-ui/filter-ui";
import Pagination from "@/components/custom-ui/pagnation";
import BlogPostSkeleton from "@/components/skeleton/blog-skeleton";
import { Input } from "@/components/ui/input";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { useBlog, useBlogs } from "@/hooks/use-blogs";
import { useState } from "react";
import type { Blog } from "@/types";
import { Link } from "react-router-dom";

const BlogAsideSkeleton = () => (
  <div className="space-y-4 mt-4 ">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="flex items-center space-x-3 animate-pulse bg-white rounded-lg shadow p-3"
      >
        <div className="w-12 h-12 bg-gray-200 rounded-md" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const BlogAsideCard = ({ blog }: { blog: Blog }) => (
  <Link
    to={`/blog/${blog.objectId}`}
    className="flex items-center space-x-3 bg-white hover:bg-gray-50 transition rounded-lg shadow p-3 group"
    key={blog.objectId}
  >
    <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border">
      {blog.coverImage ? (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-300 text-xl font-bold bg-gray-200">
          <span role="img" aria-label="Blog">
            📝
          </span>
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-semibold text-gray-800 truncate">{blog.title}</div>
      {blog.description && (
        <div className="text-xs text-gray-500 truncate">{blog.description}</div>
      )}
    </div>
  </Link>
);

const RightSide = () => {
  const {
    data: blogs,
    isLoading: isBlogsLoading,
    isError: isBlogError,
    error: blogerror,
  } = useBlogs();

  return (
    <aside className="hidden md:block md:w-1/4 pr-6 border-l border-gray-200 ">
      <div className="py-6 px-2 sticky top-0">
        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          {/* <span role="img" aria-label="Blogs" className="text-2xl"></span> */}
          Featured Blogs
        </h2>
        {isBlogsLoading ? (
          <BlogAsideSkeleton />
        ) : isBlogError ? (
          <div className="text-red-500 text-sm">Failed to load blogs.</div>
        ) : blogs && blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.slice(0, 6).map((blog) => (
              <BlogAsideCard blog={blog} key={blog.objectId} />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm mt-6 flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No blogs"
              className="w-16 h-16 mb-2 opacity-70"
            />
            No blogs found.
          </div>
        )}
      </div>
    </aside>
  );
};

const BlogHome = () => {
  // Use a fallback for process.env for Vite/browser environments
  // (This does not fix the root cause, but avoids the error in this component)
  // You should fix your API files to use import.meta.env instead of process.env for Vite!
  const { data: blogPosts, isLoading, isError, error } = useBlogPosts();
 
  const [filter, setFilter] = useState("All");
  let isEmpty = (blogPosts?.length ?? 0) < 1 && !isLoading;
  // Optionally, show error or loading state in the UI
  if (isError) {
    return <div>Error loading blog posts: {error?.message}</div>;
  }
  return (
    <div className="font-sans bg-gray-50 min-h-screen px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-row md:flex-row gap-6">
        {/* Sidebar Filters */}

        {/* Blog Content */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-row justify-between sticky top-0 z-10 bg-gray-50 items-center">
            <TopBar selectedFilter={filter} onSelect={setFilter} />
            <div className="w-full max-w-xs">
              <Input
                type="text"
                placeholder="Search blog..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-uba-red shadow-sm transition"
              />
            </div>
          </div>

          {isLoading ? (
            <>
              <BlogPostSkeleton />
              <BlogPostSkeleton />
              <BlogPostSkeleton />
              <BlogPostSkeleton />
            </>
          ) : isEmpty ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg shadow-inner">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No blogs illustration"
                className="w-24 h-24 mb-4 opacity-80"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Blog Post Yet
              </h3>
            </div>
          ) : (
            <>
              {blogPosts?.map((bp) => {
                return <BlogPostCard key={bp.objectId} blogPost={bp} />;
              })}
            </>
          )}

          {/* Pagination */}
          <Pagination />
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default BlogHome;
