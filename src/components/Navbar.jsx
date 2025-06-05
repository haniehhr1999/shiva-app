"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  console.log(path);

  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setPurchases(data.purchases);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const updateCart = async () => {
    try {
      const res = await fetch("/api/userinfo", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setPurchases(data.purchases || []);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  useEffect(() => {
    console.log('user ====>' , user)
  }, [user]);

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
    {
      href: "/about",
      title: "درباره ما",
    },
    {
      href: "/contact",
      title: "تماس با ما",
    },
    {
      href: "/blogs",
      title: "مقالات",
    },
    
  ];

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");

  useEffect(() => {
    if (user) {
      setPurchases(user.purchases || []);
    }
  }, [user]);

  const footerContent = (
    <div>
      <Button
        label="بستن"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
    </div>
  );

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div className="bg-[#d9ed92] dark:bg-gray-800 p-4 transition-colors duration-300">
      <Container>
        <div className="flex justify-between">
          <div className="flex items-center">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                className={`mx-3 ${
                  path === item.href
                    ? "text-lime-500 font-bold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                href={item.href}
              >
                <div>{item.title}</div>
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {theme === "light" ? (
                <FaMoon className="text-gray-700" />
              ) : (
                <FaSun className="text-yellow-400" />
              )}
            </button>
            <FaBasketShopping
              onClick={() => show("top-right")}
              className="cursor-pointer mx-4 text-gray-700 dark:text-gray-300"
            />
            <FaUser className="mx-2 text-gray-700 dark:text-gray-300" />
            {user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-gray-700 dark:text-gray-300">
                  سلام {user.username}
                </span>
                {user.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    داشبورد
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link
                  href="/login"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
        className="bg-white dark:bg-gray-800 rounded-xl p-8"
      >
        {purchases.length > 0 ? (
          <ul className="space-y-4">
            {purchases.map((purchase, index) => (
              <li
                key={index}
                className="rounded px-5 py-3 bg-gray-100 dark:bg-gray-700 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                      {purchase.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            purchase.productId,
                            purchase.quantity - 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300"
                      >
                        -
                      </button>
                      <span className="text-gray-600 dark:text-gray-400 w-8 text-center">
                        {purchase.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            purchase.productId,
                            purchase.quantity + 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {(purchase.price * purchase.quantity).toLocaleString()}{" "}
                    تومان
                  </div>
                </div>
              </li>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-800 dark:text-gray-200">
                  جمع کل:
                </span>
                <span className="text-green-600 dark:text-green-400">
                  {purchases
                    .reduce(
                      (total, purchase) =>
                        total + purchase.price * purchase.quantity,
                      0
                    )
                    .toLocaleString()}{" "}
                  تومان
                </span>
              </div>
            </div>
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            سبد خرید شما خالی است
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Navbar;
