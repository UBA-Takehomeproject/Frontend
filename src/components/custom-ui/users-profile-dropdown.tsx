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
import { Link } from "react-router-dom";
import BlogSelectorDialog from "./new-poste-form";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://via.placeholder.com/40" alt="Danquah" />
            <AvatarFallback>D</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mt-2">
        <DropdownMenuLabel>
          <div className="flex flex-row flex-nowrap gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://via.placeholder.com/40" alt="Danquah" />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-sm">Danquah</span>
              <span className="text-xs text-muted-foreground">@danquah662</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link to={"/my-account/posts/new"}>+ New post</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          
        <Link to={"/my-account/profile"}>Profile
        </Link></DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/my-account/blogs"}>My Blogs</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/my-account/posts"}>My Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Bookmarks</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-green-600 font-medium">
          <Link to={"/my-account/become-an-author"}>Become an Author</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600">Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
