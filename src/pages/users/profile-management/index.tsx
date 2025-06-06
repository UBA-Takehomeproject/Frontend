import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import type { User } from "@/types";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ProfilePage() {
  // const { user } = useAuth();

  const user: User = {
    id: "user_123456",
    email: "janedoe@example.com",
    fname: "Jane",
    lname: "Doe",
    photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "USER",
    createdAt: new Date("2024-04-15T10:00:00Z"),
    updatedAt: new Date("2025-06-01T12:30:00Z"),
    authorsInfo: {
      fName: "Jane",
      lName: "Doe",
      otherName: "Elizabeth",
      email: "janedoe@writinghub.com",
      phoneNumber: "+232700112233",
      photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
      createdAt: new Date("2024-04-15T10:00:00Z"),
      updatedAt: new Date("2025-06-01T12:30:00Z"),
    },
  };

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      fName: user?.authorsInfo?.fName || user?.fname || "",
      lName: user?.authorsInfo?.lName || user?.lname || "",
      email: user?.authorsInfo?.email || user?.email || "",
      phoneNumber: user?.authorsInfo?.phoneNumber || "",
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
    setPhotoPreview(user?.photoURL || null);
    setValue("photoURL", user?.photoURL || "");
  }, [user, setValue]);

  const onSubmit = (data: any) => {
    // You'd normally send this to your DB here
    toast({ title: "Profile updated (mock)" });
    reset(data);
  };

  if (!user) return <div className="text-center mt-10">No user logged in.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Profile</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button   className="bg-uba-red hover:bg-uba-red">
              Edit
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="text-center">
                <div
                  {...getRootProps()}
                  className="cursor-pointer border border-dashed rounded-full w-24 h-24 mx-auto bg-gray-50 hover:bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <input {...getInputProps()} />
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Author"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">Upload Photo</span>
                  )}
                </div>
              </div>

              <Input
                placeholder="Or paste image URL"
                {...register("photoURL")}
                onChange={(e) => setPhotoPreview(e.target.value)}
              />

              <div>
                <Label>First Name</Label>
                <Input {...register("fName")} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input {...register("lName")} />
              </div>
              <div>
                <Label>Email</Label>
                <Input {...register("email")} />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input {...register("phoneNumber")} />
              </div>

              <DialogFooter className="mt-4">
                <Button type="submit" className="bg-uba-red hover:bg-uba-red">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div
          {...getRootProps()}
          className="relative w-24 h-24 rounded-full border-2 border-dashed cursor-pointer overflow-hidden hover:ring ring-uba-red transition"
        >
          <input {...getInputProps()} />
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Avatar className="h-24 w-24">
              <AvatarImage src={photoPreview || ""} />
              <AvatarFallback>
                {user.fname[0]}
                {user.lname[0]}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-medium">
            {user.fname} {user.lname}
          </h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {user.authorsInfo && (
        <div className="mt-10 space-y-2 border-t pt-6">
          <h4 className="text-lg font-semibold">Author Bio</h4>
          <p>
            <strong>Name:</strong> {user.authorsInfo.fName}{" "}
            {user.authorsInfo.lName} {user.authorsInfo.otherName}
          </p>
          <p>
            <strong>Email:</strong> {user.authorsInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.authorsInfo.phoneNumber}
          </p>
        </div>
      )}
    </div>
  );
}
