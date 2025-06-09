import BlogPostCard from "@/components/blog/blog-post";
import TopBar from "@/components/custom-ui/filter-ui";
import Pagination from "@/components/custom-ui/pagnation";
import BlogPostSkeleton from "@/components/skeleton/blog-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/app";
import { useState } from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [filter, setFilter] = useState("All");
  const {blogPosts,isLoading} =useApp()
  let isEmpty = (blogPosts?.length ?? 0) < 1 && !isLoading;

  return (
    <section className="bg-white py-12 sm:py-18 flex items-center justify-center min-h-screen">
    {/* <section className="bg-white py-24 sm:py-32 "> */}
      <div className="w-1/2 mx-auto flex flex-col items-center">
        <div className="space-y-6 w-full">
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
              <p className="text-gray-500 mb-6">
                You haven't created any blogs= post yet. Start sharing your ideas with
                the world!
              </p>
              <Button asChild className="bg-uba-red hover:bg-uba-600">
                <Link to="new">+ Create Your First Blog Post</Link>
              </Button>
            </div>
          ) : (
            <>
              {blogPosts?.map((bp) => {
                return <BlogPostCard blogPost={bp} key={bp.objectId} />;
              })}
            </>
          )}

          {/* Pagination */}
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
