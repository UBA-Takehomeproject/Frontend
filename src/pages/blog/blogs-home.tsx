import BlogPostCard from "@/components/blog/blog-post";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Pagination = () => (
  <div className="flex justify-center items-center gap-2 mt-8">
    {[1, 2, 3, 4, 5].map((num) => (
      <Button
        key={num}
        variant="outline"
        className="w-9 h-9 text-sm rounded-full text-gray-700 hover:bg-uba-red hover:text-white"
      >
        {num}
      </Button>
    ))}
    <Button
      variant="outline"
      className="w-9 h-9 text-sm rounded-full hover:bg-uba-red hover:text-white text-gray-700"
    >
      ▶
    </Button>
  </div>
);

const TopBar = ({
  selectedFilter,
  onSelect,
}: {
  selectedFilter: string;
  onSelect: (item: string) => void;
}) => (
  // md:block md:w-1/4
  <div className="hidden md:block pr-6 mb-8 bg-gray-50  md:w-1/2 ">
    <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>
    <div className="flex flex-wrap gap-2">
      {["All", "Hot", "Suggested", "Latest"].map((item) => (
        <Badge
          key={item}
          onClick={() => onSelect(item)}
          variant={selectedFilter === item ? "default" : "outline"}
          className="cursor-pointer px-3 py-1"
        >
          {item}
        </Badge>
      ))}
    </div>
  </div>
);
const RightSide = () => (
  <aside className="hidden md:block md:w-1/4 pr-6 border-l border-gray-200">
    <div className="flex flex-wrap gap-2"></div>
  </aside>
);

const BlogHome = () => {
  const [filter, setFilter] = useState("All");

  return (
    <div className="font-sans bg-gray-50 min-h-screen px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-uba-red flex-shrink-0">
            Explore Blogs
          </h1>
          <div className="flex flex-1 items-center gap-4 justify-end">
            <Button
              variant="outline"
              className="text-sm font-roboto text-uba-red border-uba-red hover:bg-uba-red hover:text-white ml-2"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-row md:flex-row gap-6">
        {/* Sidebar Filters */}

        {/* Blog Content */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-row justify-between sticky top-0 z-10 bg-gray-50 align-center">
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
        <RightSide />
      </div>
    </div>
  );
};

export default BlogHome;
