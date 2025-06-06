import BlogCard from "@/components/custom-ui/blog-card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/mock/data";
import { Link } from "react-router-dom";


const BlogSection = () => {

  
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl flex flex-row items-center justify-between">
          <div className="text-left">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <Button type="submit" className=" bg-uba-red hover:bg-uba-600">
            <Link to={"new"}>+ New Blog</Link>
          </Button>
          {/* ="ml-4 rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition" */}
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <BlogCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
