import BlogPostCard from "@/components/blog/blog-post";
import TopBar from "@/components/custom-ui/filter-ui";
import Pagination from "@/components/custom-ui/pagnation";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const BlogSection = () => {
  const [filter, setFilter] = useState("All");

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
          <BlogPostCard
            name="Jane Doe"
            title="Understanding React Hooks"
            description="An in-depth guide into how React Hooks simplify your components and manage state."
            date="2025/06/05 09:12"
          />
          <BlogPostCard
            name="John Smith"
            title="Tailwind CSS: Utility First Styling"
            description="Why Tailwind CSS is gaining popularity and how it speeds up UI development."
            date="2025/06/04 16:30"
          />
          <BlogPostCard
            name="John Smith"
            title="Tailwind CSS: Utility First Styling"
            description="Why Tailwind CSS is gaining popularity and how it speeds up UI development."
            date="2025/06/04 16:30"
          />
          <BlogPostCard
            name="John Smith"
            title="Tailwind CSS: Utility First Styling"
            description="Why Tailwind CSS is gaining popularity and how it speeds up UI development."
            date="2025/06/04 16:30"
          />
          <BlogPostCard
            name="John Smith"
            title="Tailwind CSS: Utility First Styling"
            description="Why Tailwind CSS is gaining popularity and how it speeds up UI development."
            date="2025/06/04 16:30"
          />

          {/* Pagination */}
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
