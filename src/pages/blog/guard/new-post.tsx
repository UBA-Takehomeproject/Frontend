import NewPostForm from "@/components/custom-ui/new-poste-form";

const NewPost = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <NewPostForm />
      </div>
    </section>
  );
};

export default NewPost;
