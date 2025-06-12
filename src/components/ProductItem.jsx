"use client"
import React, { useState } from "react";
import rice1 from "../../public/images/rice1.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import Link from "next/link";

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
    <div className="shadow-md rounded-md p-6 dark:bg-[#161A1D]">
      <Toast ref={toast} />
      <Link href={`/store/${id}`} className="block">
        <div className="relative w-full aspect-square">
          <Image
            src={img}
            className="rounded-md object-cover"
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.jpg';
            }}
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {discount}% تخفیف
            </div>
          )}
        </div>
        <div className="py-3">
          <h2 className="mb-2 text-[#38b000] text-xl font-bold">{title}</h2>
          <p>{body}</p>
          <div className="flex justify-between items-center">
            <div>
              {discount > 0 ? (
                <>
                  <span className="text-gray-500 line-through text-sm">{price.toLocaleString()} تومان</span>
                  <span className="text-green-500 mr-2 block">
                    {discountedPrice.toLocaleString()} تومان
                  </span>
                </>
              ) : (
                <span className="text-green-500">{price.toLocaleString()} تومان</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAddToCart();
        }}
        disabled={loading}
        className="w-full bg-green-600 dark:bg-[#03440c] text-white rounded py-2 hover:bg-green-700 transition-colors disabled:bg-green-400"
      >
        {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
      </button>
    </div>
  );
};

export default ProductItem;
