"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-20 py-4 bg-white shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <Image
          src="/images/Simbolo-Patronos-Preto1.png"
          alt="Associação Fundo Patrimonial Patronos"
          width={50}
          height={40}
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

      {/* Menu Links */}
      <div className="flex space-x-6">
        <Link
          href="/home"
          className={`text-gray-800 hover:text-red-600 ${
            pathname === "/home" ? "font-bold text-red-600" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/mentores"
          className={`text-gray-800 hover:text-red-600 ${
            pathname === "/mentores" ? "font-bold text-red-600" : ""
          }`}
        >
          Mentores
        </Link>
        <Link
          href="/vagas"
          className={`text-gray-800 hover:text-red-600 ${
            pathname === "/vagas" ? "font-bold text-red-600" : ""
          }`}
        >
          Vagas
        </Link>
        <Link
          href="/ser-um-mentor"
          className={`text-gray-800 hover:text-red-600 ${
            pathname === "/ser-um-mentor" ? "font-bold text-red-600" : ""
          }`}
        >
          Ser um Mentor
        </Link>
        <Link
          href="/contato"
          className={`text-gray-800 hover:text-red-600 ${
            pathname === "/contato" ? "font-bold text-red-600" : ""
          }`}
        >
          Contato
        </Link>
      </div>
    </nav>
  );
}
