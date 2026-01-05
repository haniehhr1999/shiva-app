"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRef } from "react";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

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
    // User state updated
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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setPurchases(user.purchases || []);
    }
  }, [user]);


  return (
    <div className="bg-[#b0c4b1] dark:bg-[#161A1D] p-4 transition-colors duration-300">
      <Container>
        <div className="flex justify-between">
          <div className="flex items-center">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                className={`mx-3 ${
                  path === item.href
                    ? "text-[#31572c] font-bold"
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
              onClick={() => setOpen(true)}
              className="cursor-pointer mx-4 text-gray-700 dark:text-gray-300"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mx-2">
                  <FaUser className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                      پروفایل
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                        داشبورد
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      خروج
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => router.push('/login')}>
                      ورود
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/register')}>
                      ثبت نام
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-gray-700 dark:text-gray-300">
                  سلام {user.username}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>سبد خرید شما</DialogTitle>
          </DialogHeader>
          {purchases.length > 0 ? (
            <div className="space-y-4">
              {purchases.map((purchase, index) => (
                <div
                  key={index}
                  className="rounded-lg px-5 py-3 bg-muted shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">
                        {purchase.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(
                              purchase.productId,
                              purchase.quantity - 1
                            )
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">
                          {purchase.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(
                              purchase.productId,
                              purchase.quantity + 1
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {(purchase.price * purchase.quantity).toLocaleString()}{" "}
                      تومان
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>
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
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              سبد خرید شما خالی است
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              بستن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
