import NewPostForm from "@/components/custom-ui/new-post-form";
import { useApp } from "@/context/app";

import { useParams } from "react-router-dom";

const NewPost = () => {
  // Optionally get blogId param from the route
  const { blogId } = useParams<{ blogId?: string }>();
  // const { blogPosts, isLoading } = useApp();
// alert(blogPosts.length)
  return (
    <section className="bg-white py-12 sm:py-18">
      {/* <section className="bg-white py-24 sm:py-32"> */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-left space-y-6 max-w-2xl mx-auto p-6">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            New Post
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <NewPostForm blogId={blogId} />
      </div>
    </section>
  );
};

export default NewPost;
