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
import { useAuth } from "@/context/auth";

export function AppBar() {
 
  const { user } = useAuth()
 
  return (
    <header className="w-full text-uba-red  border-b bg-white px-4 py-2 flex items-center justify-between">
      {/* Left side: Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Logo" className="  h-8" />
        {/* <span className="font-semibold text-lg">UB blog</span> */}
      </Link>

      {/* Right side: Auth status */}
      <div>
        {!user ? (
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
