"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import BlogSelectorDialog from "./new-post-form";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth";
import { isNull } from "node:util";

export function UserDropdown() {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://via.placeholder.com/40" alt="Danquah" />
            <AvatarFallback>{user?.fname.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mt-2">
        <DropdownMenuLabel>
          <div className="flex flex-row flex-nowrap gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://via.placeholder.com/40" alt="Danquah" />
              <AvatarFallback>{user?.fname.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-sm">{`${user?.fname} ${user?.lname}`}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {user?.authorsInfo && (
          <DropdownMenuItem>
            <Link to={"/my-account/posts/new"}>+ New post</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link to={"/my-account/profile"}>Profile</Link>
        </DropdownMenuItem>
        {user?.authorsInfo && (
          <DropdownMenuItem>
            <Link to={"/my-account/blogs"}>My Blogs</Link>
          </DropdownMenuItem>
        )}
        {user?.authorsInfo && (
          <DropdownMenuItem>
            <Link to={"/my-account/posts"}>My Posts</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Bookmarks</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>

        <DropdownMenuSeparator />

        {user?.authorsInfo == null && (
          <DropdownMenuItem className="text-green-600 font-medium">
            <Link to={"/my-account/become-an-author"}>Become an Author</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={async () => {
            try {
              await logout();
              toast({
                title: "Success",
                description: "You have been successfully logged out.",
              });
              navigate("/"); // Redirect to home page after successful login
            } catch (error) {
              toast({
                title: "Error",
                description:
                  error instanceof Error ? error.message : "Failed to login",
                variant: "destructive",
              });
            }
          }}
          className="text-red-600"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
