"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="py-5 flex flex-col items-between space-y-9 bg-[#009743] px-8 mx-auto text-white">
      <nav className="flex items-center justify-between">
        <p className="font-bold text-2xl">Eco-Hub</p>
        <div className="hidden md:flex items-center space-x-9 font-bold lg:font-lg">
          <Link href="/">Home</Link>
          {/* <Link href="/login" className="px-4 py-2 border-2 border-[#FFCB0A] rounded-lg">
            Login
          </Link> */}
          <Link
            href="/signup"
            className="px-4 py-1 border border-transparent rounded text-xl bg-[#FFCB0A] text-black"
          >
            Sign Up
          </Link>
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
  );
};

export default Navbar;
