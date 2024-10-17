import Navbar from "../components/Navbar"; // Import your existing Navbar component

const Header = ({ currentPage }) => {
  return (
    <header>
      <Navbar currentPage={currentPage} /> {/* Pass currentPage as prop */}
    </header>
  );
};

export default Header;
