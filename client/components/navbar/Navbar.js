"use client";
import React, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation"

const Navbar = () => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-screen">
    <div className="py-5 flex flex-col bg-[#000301] items-between space-y-9 rounded-b-3xl px-8 mx-auto text-white">
      <nav className="flex items-center  justify-between">
        <p className="font-bold text-2xl">AccountingAI</p>
        <div className="hidden md:flex items-center space-x-9 font-bold lg:font-lg">
          <div onClick={()=>router.push("/")}>Home</div>
          <div
            onClick={()=>router.push("./signup")}
            className="px-4 py-1 border border-transparent rounded text-lg bg-white text-black"
            >
            Sign Up
          </div>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>
      <div
        className={`mobile-menu ${
          isMobileMenuOpen ? "" : "hidden"
        } md:hidden flex flex-col items-end space-y-2 px-9 pt-3 pb-3 text-sm`}
      >
        <Link href="/home">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
