"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const Layout = ({ children , initialUser }) => {

  let pathname = usePathname()
  console.log('pathname ===>', pathname)


  return <div>
    {
      pathname !== '/login' && pathname !== '/register' &&
      <Navbar initialUser = {initialUser} />
    }
    
    {children}

    {
      pathname !== '/login' && pathname !== '/register' &&
      <Footer />

    }

  </div>;
};

export default Layout;
