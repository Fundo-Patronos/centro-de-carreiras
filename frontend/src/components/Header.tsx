import React from 'react';
import Navbar from "../components/Navbar"; // Import your existing Navbar component

interface HeaderProps {
  currentPage: string; // Define the type of currentPage
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <header>
      <Navbar _currentPage={currentPage} /> {/* Pass currentPage as prop */}
    </header>
  );
};

export default Header;
