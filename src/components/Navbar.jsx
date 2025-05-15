"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Container from "@/components/Container"

import React from "react";

const Navbar = () => {
  const path = usePathname();

  console.log(path);

  const navLinks = [
    {
      href: "/",
      title: "home",
    },
    {
      href: "/store",
      title: "store",
    },
  ];

  return (
    <div className="bg-amber-300 p-4">
      <Container>
        {navLinks.map((item) => (
          <Link
            key={item.href}
            className={`mx-3 ${
              path === item.href ? "text-lime-500 font-bold" : ""
            }`}
            href={item.href}
          >
            {item.title}
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default Navbar;
