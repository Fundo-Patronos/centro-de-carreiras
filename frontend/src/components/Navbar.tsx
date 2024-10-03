import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function Navbar({ currentPage }) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <HomeIcon className="w-6 h-6 text-red-600" />
        <Link href="/" className="text-xl font-bold text-gray-800">
          Associação Fundo Patrimonial Patronos
        </Link>
      </div>
      {/* Links */}
      <div className="flex space-x-6">
        <Link
          href="/"
          className={`${currentPage === "home" ? "text-red-600 font-bold" : "text-gray-800"
            } hover:text-red-600`}
        >
          Home
        </Link>
        <Link
          href="/mentores"
          className={`${currentPage === "mentores" ? "text-red-600 font-bold" : "text-gray-800"
            } hover:text-red-600`}
        >
          Mentores
        </Link>
        <Link
          href="/vagas"
          className={`${currentPage === "vagas" ? "text-red-600 font-bold" : "text-gray-800"
            } hover:text-red-600`}
        >
          Vagas
        </Link>
        <Link
          href="/ser-um-mentor"
          className={`${currentPage === "ser-um-mentor" ? "text-red-600 font-bold" : "text-gray-800"
            } hover:text-red-600`}
        >
          Ser um Mentor
        </Link>
        <Link
          href="/contato"
          className={`${currentPage === "contato" ? "text-red-600 font-bold" : "text-gray-800"
            } hover:text-red-600`}
        >
          Contato
        </Link>
      </div>
    </nav>
  );
}
