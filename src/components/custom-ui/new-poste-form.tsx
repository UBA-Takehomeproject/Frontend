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
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";
import type { Author, BlogPost } from "@/types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

const blogPosts = [
  { title: "Boost your conversion rate", href: "#" },
  { title: "Grow your email list with these 5 tips", href: "#" },
  { title: "How to create content that converts", href: "#" },
];



export default function NewPostForm() {
  const [open, setOpen] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const auth = useAuth();
  const authorsInfo = auth.user?.authorsInfo as Author;

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<BlogPost>({
      defaultValues: { authorsInfo },
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

  const onSubmit = async (data: BlogPost) => {
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
      setOpen(false);
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message });
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
        <div>
          <Label>Choose Blog Template</Label>
          <Select onValueChange={(value) => setValue("href", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a blog template" />
            </SelectTrigger>
            <SelectContent>
              {blogPosts.map((post, index) => (
                <SelectItem key={index} value={post.href}>
                  {post.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="e.g. Web Development"
            {...register("category", { required: true })}
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

        <Button type="submit" className="w-full bg-uba-red hover:bg-uba-red/90">
          Submit Blog
        </Button>
      </form>
    </>
  );
}
