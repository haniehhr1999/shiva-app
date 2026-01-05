"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const showNavbar = pathname !== '/login' && pathname !== '/register';

  return (
    <div>
      {showNavbar && <Navbar />}
      {children}
      {showNavbar && <Footer />}
    </div>
  );
};

export default Layout;
