"use client"
import React, { useState } from "react";
import rice1 from "../../public/images/rice1.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProductItem = ({ id, title, body, price, img, discount = 0 }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useRef(null);

  const discountedPrice = discount > 0 ? Math.round(price * (1 - discount / 100)) : price;

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.current.show({
          severity: "success",
          summary: "موفق",
          detail: data.message,
          life: 3000,
        });
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        if (res.status === 401) {
          router.push("/login");
        } else {
          toast.current.show({
            severity: "error",
            summary: "خطا",
            detail: data.error,
            life: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.current.show({
        severity: "error",
        summary: "خطا",
        detail: "خطا در افزودن به سبد خرید",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <Toast ref={toast} />
      <Link href={`/store/${id}`} className="block">
        <div className="relative w-full aspect-square">
          <Image
            src={img || '/images/placeholder.svg'}
            className="object-cover"
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {discount}% تخفیف
            </Badge>
          )}
        </div>
        <CardContent className="py-3">
          <h2 className="mb-2 text-[#38b000] text-xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{body}</p>
          <div className="flex justify-between items-center mt-2">
            <div>
              {discount > 0 ? (
                <>
                  <span className="text-muted-foreground line-through text-sm block">{price.toLocaleString()} تومان</span>
                  <span className="text-green-500 font-bold">
                    {discountedPrice.toLocaleString()} تومان
                  </span>
                </>
              ) : (
                <span className="text-green-500 font-bold">{price.toLocaleString()} تومان</span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="pt-0">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
