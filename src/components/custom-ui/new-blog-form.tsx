import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { useCreateBlog } from "@/hooks/use-blogs";
import { useToast } from "@/hooks/use-toast";
import type { Author, Blog } from "@/types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

export default function BlogForm() {
  const auth = useAuth();
  const { toast } = useToast();
  const { mutate: createBlog, isPending, error } = useCreateBlog();
  const { register, handleSubmit, reset, setValue } = useForm<Blog>();
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const onDropCover = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setValue("coverImage", previewUrl);
    const authorsInfo = auth.user?.authorsInfo as Author;

    if (authorsInfo) {
      setValue("authorsObjectId", authorsInfo.objectId as string);
    }
  };

  const { getRootProps: getCoverRoot, getInputProps: getCoverInput } =
    useDropzone({
      onDrop: onDropCover,
      accept: { "image/*": [] },
      maxFiles: 1,
    });

  const onSubmit = async (data: Blog) => {
    try {
      const authorsInfo = auth.user?.authorsInfo as Author;
      data.authorsObjectId = authorsInfo.objectId;
      data.href = `/blog/`;
      //later will be changed to proper href or done in server
      createBlog(data, {
        onSuccess: () => {
          // NOTE: If the toast is not appearing, ensure you are using the correct toast hook from shadcn/ui.
          // If you are using the shadcn/ui toast system, you should use the `useToast` hook, not a direct import.
          // Example fix:
          // const { toast } = useToast(); // Place this at the top of your component
          toast({
            title: "Success",
            description: "Blog created successfully!",
          });
          reset();
          setCoverPreview(null);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to create blog",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to create blog",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title", { required: true })} />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          {...register("date", { required: true })}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register("description", { required: true })}
        />
      </div>

      {/* Dropzone: Cover Image */}
      <div>
        <Label>Cover Image</Label>
        <div
          {...getCoverRoot()}
          className="border border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <input {...getCoverInput()} />
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Cover Preview"
              width={400}
              height={200}
              className="rounded-md mx-auto"
            />
          ) : (
            <p>Drop cover image here or click to upload</p>
          )}
        </div>
      </div>

      {/* Optional fallback URL input */}
      <Input
        placeholder="Or paste cover image URL"
        {...register("coverImage")}
        onChange={(e) => setCoverPreview(e.target.value)}
      />
      <Button
        type="submit"
        className="w-full bg-uba-red hover:bg-uba-red"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Submit Blog"}
      </Button>
    </form>
  );
}
