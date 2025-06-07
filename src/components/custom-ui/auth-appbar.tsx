"use client";

import { Link } from "react-router-dom";

export function AuthAppBar() {
 
  return (
    <header className="w-full absolute top-2 text-uba-red  bg-transparent px-4 py-2 flex items-center justify-between">
      {/* Left side: Logo */}
    <Link to="/" className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Logo" className="h-8" />
        {/* <span className="font-semibold text-lg">UB blog</span> */}
      </Link>

      {/* Right side: Auth status */}
      <div>
        
      </div>
    </header>
  );
}
