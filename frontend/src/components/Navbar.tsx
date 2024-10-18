"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import type { JSX } from "react";

interface NavbarProps {

  _currentPage: string;

}

export default function Navbar({ _currentPage }: NavbarProps): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 lg:px-20 lg:py-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <Image
            src="/images/Simbolo-Patronos-Preto1.png"
            alt="Associação Fundo Patrimonial Patronos"
            width={50}
            height={40}
            style={{ width: "auto", height: "auto" }} 
          />
          {/* Separation Bar */}
          <div className="h-12 border-l-2 border-gray-400"></div>
          {/* Name */}
          <Link
            href="/home"
            className="text-gray-800 leading-tight text-sm font-semibold"
          >
            <span className="block">Associação</span>
            <span className="block">Fundo Patrimonial</span>
            <span className="block font-black">Patronos</span>
          </Link>
        </div>

        {/* Hamburger menu icon with transform animation*/}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="relative w-6 h-6 flex flex-col justify-between items-center"
          >
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-3" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Menu Links */}
        <div className={`lg:flex lg:space-x-6 hidden lg:block`}>
          <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-6 lg:items-center lg:justify-center">
            <Link
              href="/home"
              className={`block text-gray-800 hover:text-red-600 ${
                pathname === "/home" ? "font-bold text-red-600" : ""
              }`}
              onClick={() => setIsOpen(false)} // Close dropdown after click
            >
              Home
            </Link>
            <Link
              href="/mentores"
              className={`block text-gray-800 hover:text-red-600 ${
                pathname === "/mentores" ? "font-bold text-red-600" : ""
              }`}
              onClick={() => setIsOpen(false)} // Close dropdown after click
            >
              Mentores
            </Link>
            <Link
              href="/vagas"
              className={`block text-gray-800 hover:text-red-600 ${
                pathname === "/vagas" ? "font-bold text-red-600" : ""
              }`}
              onClick={() => setIsOpen(false)} // Close dropdown after click
            >
              Vagas
            </Link>
            <Link
              href="/ser-um-mentor"
              className={`block text-gray-800 hover:text-red-600 ${
                pathname === "/ser-um-mentor" ? "font-bold text-red-600" : ""
              }`}
              onClick={() => setIsOpen(false)} // Close dropdown after click
            >
              Ser um Mentor
            </Link>
            <Link
              href="/contato"
              className={`block text-gray-800 hover:text-red-600 ${
                pathname === "/contato" ? "font-bold text-red-600" : ""
              }`}
              onClick={() => setIsOpen(false)} // Close dropdown after click
            >
              Contato
            </Link>
          </div>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="lg:hidden px-6 py-2 bg-white shadow-md">
          <Link
            href="/home"
            className={`block py-2 text-gray-800 hover:text-red-600 ${
              pathname === "/home" ? "font-bold text-red-600" : ""
            }`}
            onClick={toggleMenu} // Close dropdown after click
          >
            Home
          </Link>
          <Link
            href="/mentores"
            className={`block py-2 text-gray-800 hover:text-red-600 ${
              pathname === "/mentores" ? "font-bold text-red-600" : ""
            }`}
            onClick={toggleMenu} // Close dropdown after click
          >
            Mentores
          </Link>
          <Link
            href="/vagas"
            className={`block py-2 text-gray-800 hover:text-red-600 ${
              pathname === "/vagas" ? "font-bold text-red-600" : ""
            }`}
            onClick={toggleMenu} // Close dropdown after click
          >
            Vagas
          </Link>
          <Link
            href="/ser-um-mentor"
            className={`block py-2 text-gray-800 hover:text-red-600 ${
              pathname === "/ser-um-mentor" ? "font-bold text-red-600" : ""
            }`}
            onClick={toggleMenu} // Close dropdown after click
          >
            Ser um Mentor
          </Link>
          <Link
            href="/contato"
            className={`block py-2 text-gray-800 hover:text-red-600 ${
              pathname === "/contato" ? "font-bold text-red-600" : ""
            }`}
            onClick={toggleMenu} // Close dropdown after click
          >
            Contato
          </Link>
        </div>
      )}
    </nav>
  );
}