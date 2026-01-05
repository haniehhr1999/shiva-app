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
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 group">
      <Toast ref={toast} />
      <Link href={`/store/${id}`} className="block">
        <div className="relative w-full aspect-square overflow-hidden bg-muted/30">
          <Image
            src={img || '/images/placeholder.svg'}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {discount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute top-1.5 right-1.5 text-[10px] px-1.5 py-0.5 h-5 font-medium"
            >
              {discount}%
            </Badge>
          )}
        </div>
        <CardContent className="p-3 space-y-1.5">
          <h2 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {body}
          </p>
          <div className="pt-1">
            {discount > 0 ? (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground line-through">
                  {price.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {discountedPrice.toLocaleString()} تومان
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold text-primary">
                {price.toLocaleString()} تومان
              </span>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-3 pt-0">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={loading}
          size="sm"
          className="w-full h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loading ? "..." : "افزودن به سبد"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
