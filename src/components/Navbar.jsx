"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { FaUser } from "react-icons/fa";

import React from "react";

const Navbar = () => {
  const path = usePathname();

  console.log(path);

  const navLinks = [
    {
      href: "/",
      title: "خانه",
    },
    {
      href: "/store",
      title: "فروشگاه",
    },
  ];

  return (
    <div className="bg-[#d9ed92] p-4">
      <Container>
        <div className="flex justify-between">
          <div>
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
          </div>

          <div className="flex items-center">
            <FaUser className="mx-2"/>
            سلام حانیه
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
