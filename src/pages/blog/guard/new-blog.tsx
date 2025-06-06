import BlogForm from "@/components/custom-ui/new-blog-form";

const BlogSection = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BlogForm />
      </div>
    </section>
  );
};

export default BlogSection;
