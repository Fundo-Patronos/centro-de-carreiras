import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, currentPage }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={currentPage} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
