"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();

  console.log(path);

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/userinfo", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }
    }

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

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
            <FaBasketShopping onClick={() => show("top-right")} className="cursor-pointer" />
            <FaUser className="mx-2" />
            {user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-gray-700">
                  سلام
                  {user.username}
                </span>
                {user.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    داشبورد
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-700"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="text-gray-500 hover:text-gray-700"
                >
                  ثبت نام
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
      <Dialog
        header="سبد خرید شما "
        visible={visible}
        position={position}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
        draggable={false}
        resizable={false}
        className="bg-slate-200 rounded-xl p-8"
      >
        <ul>
          <li className="rounded px-5 py-2 bg-white my-2">dfklkdfjg;sldf</li>
          <li className="rounded px-5 py-2 bg-white my-2">dfklkdfjg;sldf</li>
          <li className="rounded px-5 py-2 bg-white my-2">dfklkdfjg;sldf</li>
        </ul>
      </Dialog>
    </div>
  );
};

export default Navbar;
