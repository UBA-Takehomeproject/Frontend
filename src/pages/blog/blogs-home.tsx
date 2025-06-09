import BlogPostCard from "@/components/blog/blog-post";
import TopBar from "@/components/custom-ui/filter-ui";
import Pagination from "@/components/custom-ui/pagnation";
import BlogPostSkeleton from "@/components/skeleton/blog-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { useState } from "react";
import { Link } from "react-router-dom";

const RightSide = () => (
  <aside className="hidden md:block md:w-1/4 pr-6 border-l border-gray-200">
    <div className="flex flex-wrap gap-2"></div>
  </aside>
);

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
