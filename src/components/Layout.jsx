"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import useRouter from "next/router";
import React from "react";

const Layout = ({children}) => {


  return <div>
    <Navbar />
    {children}
    
  </div>;
};

export default Layout;
