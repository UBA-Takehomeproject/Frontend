import BlogCard from "@/components/custom-ui/blog-card";
import BlogSkeleton from "@/components/skeleton/blog-skeleton";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app";
import { Link } from "react-router-dom";

const BlogSection = () => {
  // const { data: blogItems, isLoading } = useBlogs();

  const { blogs: blogItems, isLoading } = useApp();
 let isEmpty=blogItems.length<1 && !isLoading;
  return (
    <section className="bg-white py-12 sm:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl flex flex-row items-center justify-between">
          <div className="text-left">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              My blogs
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
          
          {isLoading ? (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          ) : isEmpty?
          (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg shadow-inner">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No blogs illustration"
                className="w-24 h-24 mb-4 opacity-80"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Blogs Yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't created any blogs yet. Start sharing your ideas with the world!
              </p>
              <Button asChild className="bg-uba-red hover:bg-uba-600">
                <Link to="new">+ Create Your First Blog</Link>
              </Button>
            </div>
          )
          
          :(
            <>
              {blogItems?.map((blog, idx) => (
                <BlogCard key={blog.objectId} blog={blog} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
