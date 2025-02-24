import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-4 px-6  border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AI Cheat Sheet Generator. All
            rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link
              href="
          https://www.github.com/sanketpathare"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm"
            >
              Build by:{" "}
              <span className="underline hover:text-gray-300">
                Sanket Pathare
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
