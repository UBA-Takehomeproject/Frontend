"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { UserDropdown } from "./users-profile-dropdown";

export function AppBar() {
 
  const { data: session } = { data: { user: {image:"",name:"Emmanuel kofi"} } };
 
  return (
    <header className="w-full text-uba-red  border-b bg-white px-4 py-2 flex items-center justify-between">
      {/* Left side: Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
        <span className="font-semibold text-lg">UB blog</span>
      </Link>

      {/* Right side: Auth status */}
      <div>
        {!session?.user ? (
          <Button
            variant="outline"
            className="text-sm font-roboto text-uba-red border-uba-red hover:bg-uba-red hover:text-white ml-2"
          >
            <Link to={"/auth/signin"}>Login</Link>
          </Button>
        ) : (
           <UserDropdown/>
        )}
      </div>
    </header>
  );
}
