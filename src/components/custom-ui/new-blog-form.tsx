import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";
import type { Author } from "@/types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

type BlogFormData = {
  title: string;
  date: string;
  authorsInfo: Author;
  coverImage: string;
  href: string;
};

export default function BlogForm() {
  const auth = useAuth();
  const authorsInfo = auth.user?.authorsInfo as Author;

  const { register, handleSubmit, reset, setValue } = useForm<BlogFormData>();
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const onDropCover = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setValue("coverImage", previewUrl);
    if (authorsInfo)
      setValue("authorsInfo",authorsInfo);
      
   };

  const { getRootProps: getCoverRoot, getInputProps: getCoverInput } =
    useDropzone({
      onDrop: onDropCover,
      accept: { "image/*": [] },
      maxFiles: 1,
    });

  const onSubmit = async (data: BlogFormData) => {
    try {
 
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit blog");
      toast({ title: "Blog submitted successfully!" });
      reset();
      setCoverPreview(null);
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message });
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
        <Label htmlFor="authorName">Author First Name</Label>
        <Input id="authorName" {...register("authorsInfo.fName", { required: true })} />
      </div>
      <div>
        <Label htmlFor="authorName">Author Last Name</Label>
        <Input id="authorName" {...register("authorsInfo.lName", { required: true })} />
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

      <Button type="submit" className="w-full bg-uba-red hover:bg-uba-red">
        Submit Blog
      </Button>
    </form>
  );
}
