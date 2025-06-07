import BlogForm from "@/components/custom-ui/new-blog-form";

const BlogSection = () => {
  return (
    <section className="bg-white py-12 sm:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-left space-y-6 max-w-2xl mx-auto p-6">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            New blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <BlogForm />
      </div>
    </section>
  );
};

export default BlogSection;
