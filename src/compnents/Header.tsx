"use client";

import React, { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { headerData } from "../assets/mockdata";
import Image from "next/image";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="bg-cover bg-center text-white"
      style={{ backgroundImage: 'url("/headerbg.png")' }}
    >
      <header className="flex justify-between items-center p-4 shadow-md bg-transparent h-[10vh] relative">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          {headerData.logo && (
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
          )}
          <h1 className="text-sm md:text-lg font-bold">{headerData.title}</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {headerData.navLinks?.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-sm hover:underline hover:text-amber-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Contact */}
        <div className="hidden md:block text-sm">
          <p>{headerData.contact?.phone}</p>
          <p>{headerData.contact?.email}</p>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <RxCross2 size={24} className="text-white" />
          ) : (
            <RxHamburgerMenu size={24} className="text-white" />
          )}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 md:hidden z-50">
            {headerData.navLinks?.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-sm text-black hover:underline hover:text-amber-500"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="text-sm text-gray-600 border-t pt-2">
              <p>{headerData.contact?.phone}</p>
              <p>{headerData.contact?.email}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
