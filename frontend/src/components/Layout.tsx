import Header from "./Header";
import Footer from "./Footer";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
}

const Layout = ({ children, currentPage }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={currentPage} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
