import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";
import type { Author } from "@/types";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useCreateAuthor } from "@/hooks/use-author";
import { useNavigate } from "react-router-dom";

type AuthorFormData = Author;

export default function RegisterAuthorForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, reset, setValue } =
    useForm<AuthorFormData>({
      defaultValues: {
        objectId:user?.objectId,
        fName: user?.fname || "",
        lName: user?.lname || "",
        email: user?.email || "",
        photoURL: user?.photoURL || "",
      },
    });

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user?.photoURL || null
  );

  const { mutate: createAuthor, isPending } = useCreateAuthor();

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

  const onSubmit = (data: AuthorFormData) => {
    createAuthor(data, {
      onSuccess: () => {
        toast({ title: "Registration successful!" });
        reset();
        setPhotoPreview(user?.photoURL || null);
        navigate("/")
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to register as author",
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6"
    >
      <h2 className="text-2xl font-semibold text-center">
        Register as an Author
      </h2>

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
        <Label htmlFor="otherName">Bio</Label>
        <Textarea rows={3} id="bio" {...register("bio")} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email", { required: true })} disabled />
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          {...register("phoneNumber", { required: true })}
        />
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

      <Button
        type="submit"
        className="w-full bg-uba-red hover:bg-uba-red/90"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
