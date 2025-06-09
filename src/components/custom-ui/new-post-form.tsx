"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/app";
import { useAuth } from "@/context/auth";
import { useCreateBlogPost } from "@/hooks/use-blog-posts";
import { toast } from "@/hooks/use-toast";
import type { Author, BlogPost } from "@/types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

export default function NewPostForm({ blogId }: { blogId?: string }) {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const { user } = useAuth();
  const { blogs, isLoading } = useApp();
  const authorsInfo = user?.authorsInfo as Author;
  // alert(blogPosts.length)
  const { mutate: createBlogPost, isPending } = useCreateBlogPost();

  const { register, handleSubmit, reset, setValue, watch } = useForm<
    Partial<BlogPost>
  >({
    defaultValues: {
      category: [],
      blog: blogId ? { objectId: blogId } : undefined,
    },
  });

  const onDropCover = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setValue("coverImage", previewUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropCover,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const onSubmit = async (data: Partial<BlogPost>) => {
    try {
       data.authorsObjectId = authorsInfo.objectId;
      data.href = `#`;
      data.blogObjectId = blogId ?? data.objectId;
      createBlogPost(data, {
        onSuccess: () => {
          toast({ title: "Blog submitted successfully!" });
          reset();
          setCoverPreview(null);
          // setOpen(false);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description:
              error instanceof Error
                ? error.message
                : "Failed to create blog post",
          });
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create blog post",
      });
    }
  };
  
  return (
    <>
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
            type="datetime-local"
            id="date"
            {...register("date", { required: true })}
          />
        </div>
        {typeof blogId === "undefined" && (
          <div>
            <Label>Choose Blog Template</Label>
            {isLoading ? (
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : (
              <Select onValueChange={(value) => setValue("objectId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a blog template" />
                </SelectTrigger>
                <SelectContent>
                  {blogs?.map((blog, index) => (
                    <SelectItem key={index} value={blog.objectId as string}>
                      <div className="flex items-center space-x-2">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <span>{blog.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="title">Description</Label>
          <Input id="description" {...register("description", { required: true })} />
        </div>
        <div>
          <Label htmlFor="category">Categories</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(watch("category", []) ?? []).map((cat: string, idx: number) => (
              <span
                key={cat + idx}
                className="inline-flex mb-2 items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800"
              >
                {cat}
                <button
                  type="button"
                  className="ml-2  text-gray-500 hover:text-red-500 focus:outline-none"
                  onClick={() => {
                    const current = watch("category", []);
                    if (current)
                      setValue(
                        "category",
                        current.filter((c: string, i: number) => i !== idx),
                        { shouldValidate: true }
                      );
                  }}
                  aria-label={`Remove ${cat}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <Input
            id="category"
            placeholder="Add a category and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                e.preventDefault();
                const current = watch("category", []);
                if (!current?.includes(e.currentTarget.value.trim())) {
                  setValue(
                    "category",
                    [...(current ?? []), e.currentTarget.value.trim()],
                    { shouldValidate: true }
                  );
                }
                e.currentTarget.value = "";
              }
            }}
          />
          {/* Hidden input to register the array with react-hook-form */}
          <input
            type="hidden"
            {...register("category", { required: true })}
            value={JSON.stringify(watch("category", []))}
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            rows={5}
            {...register("content", { required: true })}
          />
        </div>

        <div>
          <Label>Cover Image</Label>
          <div
            {...getRootProps()}
            className="border border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <input {...getInputProps()} />
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-full max-h-64 object-cover rounded-md"
              />
            ) : (
              <p>Drop image here or click to upload</p>
            )}
          </div>
        </div>
        <div>
          <Input
            placeholder="Or paste image URL"
            {...register("coverImage")}
            onChange={(e) => setCoverPreview(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-uba-red hover:bg-uba-red/90"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit Blog"}
        </Button>
      </form>
    </>
  );
}
