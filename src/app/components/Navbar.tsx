"use client";
import { Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 px-6 flex flex-wrap justify-between items-center border-b border-gray-800">
      <div className="flex items-center">
        <Sparkles className="w-6 h-6 text-indigo-400 mr-2" />
        <Link href="/" className="text-xl font-bold text-white">
          CheatSheetAI
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden ml-auto flex items-center"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-300" />
        )}
      </button>

      {/* Desktop navigation and button */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center w-full md:w-auto mt-4 md:mt-0`}
      >
        <nav className="md:mr-6">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <li>
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Get Started button (desktop) */}
        <Link
          href="/cheatsheet"
          className="hidden md:block px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 text-sm"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
