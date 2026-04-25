"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
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

const Navbar = ({ initialUser }) => {
  console.log({initialUser})
  const path = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
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

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 0 }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setPurchases(data.purchases);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getProductImage = (productId) => {
    // این تابع می‌تواند از API محصولات تصویر را بگیرد
    // فعلاً placeholder برمی‌گردانیم
    return '/images/placeholder.svg';
  };

  const handleCheckout = () => {
    // TODO: Navigate to checkout page
    router.push('/checkout');
    setOpen(false);
  };

  const updateCart = async () => {
    try {
      const res = await fetch("/api/userinfo", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        console.log({data})
        setUser(data);
        setPurchases(data.purchases || []);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // useEffect(() => {
  //   updateCart();
  //   window.addEventListener("cartUpdated", updateCart);
  //   return () => {
  //     window.removeEventListener("cartUpdated", updateCart);
  //   };
  // }, []);

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

            {initialUser  ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-gray-700 dark:text-gray-300">
                  سلام {initialUser.username}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-green-800 shadow-2xl">
          <DialogHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-t-lg -mx-6 -mt-6 px-6 pt-6 mb-4 border-b border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    سبد خرید شما
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-foreground font-medium">
                    {purchases.length > 0 
                      ? `${purchases.length} محصول در سبد خرید شما` 
                      : "سبد خرید شما خالی است"}
                  </DialogDescription>
                </div>
              </div>
              {purchases.length > 0 && (
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                  {purchases.reduce((sum, p) => sum + p.quantity, 0)} عدد
                </Badge>
              )}
            </div>
          </DialogHeader>
          
          <Separator />

          {purchases.length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-2">
                {purchases.map((purchase, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-green-950/20"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* تصویر محصول */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={getProductImage(purchase.productId)}
                            alt={purchase.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* اطلاعات محصول */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                              {purchase.title}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                              onClick={() => removeFromCart(purchase.productId)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between gap-4 mt-3">
                            {/* کنترل تعداد */}
                            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-background"
                                onClick={() =>
                                  updateQuantity(
                                    purchase.productId,
                                    purchase.quantity - 1
                                  )
                                }
                                disabled={purchase.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-10 text-center font-semibold text-lg">
                                {purchase.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-background"
                                onClick={() =>
                                  updateQuantity(
                                    purchase.productId,
                                    purchase.quantity + 1
                                  )
                                }
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* قیمت */}
                            <div className="text-left">
                              <div className="text-sm text-muted-foreground mb-1">
                                قیمت واحد
                              </div>
                              <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {purchase.price.toLocaleString()} تومان
                              </div>
                              <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                                {(purchase.price * purchase.quantity).toLocaleString()} تومان
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="my-4" />

              {/* خلاصه سفارش */}
              <div className="space-y-3 pb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-4 border-2 border-green-200 dark:border-green-800">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-foreground font-medium">تعداد کل:</span>
                  <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {purchases.reduce((sum, p) => sum + p.quantity, 0)} عدد
                  </span>
                </div>
                <Separator className="bg-green-200 dark:bg-green-800" />
                <div className="flex justify-between items-center text-xl font-bold pt-2">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    جمع کل سفارش:
                  </span>
                  <span className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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

              <DialogFooter className="gap-2 sm:gap-0">
                <Button 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  className="border-2 border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/30"
                >
                  ادامه خرید
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg flex-1 sm:flex-initial"
                >
                  <ShoppingBag className="ml-2 w-4 h-4" />
                  تسویه حساب
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center mb-4 shadow-lg">
                <ShoppingBag className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                سبد خرید شما خالی است
              </h3>
              <p className="text-foreground mb-6 max-w-sm font-medium">
                محصولات مورد علاقه خود را به سبد خرید اضافه کنید
              </p>
              <Button 
                onClick={() => { setOpen(false); router.push('/store'); }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
              >
                مشاهده محصولات
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
