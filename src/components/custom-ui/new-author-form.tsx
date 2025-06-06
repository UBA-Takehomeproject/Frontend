import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";
import type { Author } from "@/types";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";

type AuthorFormData = Author;

export default function RegisterAuthorForm() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<AuthorFormData>({
    defaultValues: {
      fName: user?.fname || "",
      lName: user?.lname || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    },
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user?.photoURL || null
  );

  const onDropPhoto = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
    setValue("photoURL", previewUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropPhoto,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  useEffect(() => {
    // Refill values if user data changes
    setValue("fName", user?.fname || "");
    setValue("lName", user?.lname || "");
    setValue("email", user?.email || "");
    setValue("photoURL", user?.photoURL || "");
    setPhotoPreview(user?.photoURL || null);
  }, [user, setValue]);

  const onSubmit = async (data: AuthorFormData) => {
    try {
      const res = await fetch("/api/author/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to register as author");

      toast({ title: "Registration successful!" });
      reset();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6"
    >
      <h2 className="text-2xl font-semibold text-center">Register as an Author</h2>

      <div>
        <Label htmlFor="fName">First Name</Label>
        <Input id="fName" {...register("fName", { required: true })} />
      </div>

      <div>
        <Label htmlFor="lName">Last Name</Label>
        <Input id="lName" {...register("lName", { required: true })} />
      </div>

      <div>
        <Label htmlFor="otherName">Other Name</Label>
        <Input id="otherName" {...register("otherName")} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email", { required: true })} disabled />
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" {...register("phoneNumber", { required: true })} />
      </div>

      {/* Dropzone for Profile Photo */}
      <div>
        <Label>Profile Picture</Label>
        <div
          {...getRootProps()}
          className="border border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <input {...getInputProps()} />
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Author Preview"
              width={100}
              height={100}
              className="rounded-full mx-auto"
            />
          ) : (
            <p>Drop or click to upload photo</p>
          )}
        </div>
      </div>

      <Input
        placeholder="Or paste image URL"
        {...register("photoURL")}
        onChange={(e) => setPhotoPreview(e.target.value)}
      />

      <Button type="submit" className="w-full bg-uba-red hover:bg-uba-red/90">
        Submit
      </Button>
    </form>
  );
}
