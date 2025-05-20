"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useRouter from "next/router";
import React from "react";

const Layout = ({children}) => {


  return <div>
    <Navbar />
    {children}
    <Footer />
    
  </div>;
};

export default Layout;
