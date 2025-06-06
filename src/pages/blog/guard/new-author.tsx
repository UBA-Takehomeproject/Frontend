import RegisterAuthorForm from "@/components/custom-ui/new-author-form";

const BlogSection = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RegisterAuthorForm />
      </div>
    </section>
  );
};

export default BlogSection;
