"use client"
import React, { useState } from "react";
import rice1 from "../../public/images/rice1.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const ProductItem = ({ id, title, body, price, img }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useRef(null);

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
    <div className="shadow-md rounded-md p-6">
      {/* <img src={rice1} alt="cvxcv" /> */}
      <Toast ref={toast} />
      <Image
        src={img}
        className="rounded-md"
        alt={title}
        width={300}
        height={300}
      />
      <div className="py-3">
        <h2 className="mb-2 text-[#38b000] text-xl font-bold">{title}</h2>
        <p>{body}</p>
        <p className="text-lg font-bold mt-2">{price.toLocaleString()} تومان</p>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 transition-colors disabled:bg-green-400"
      >
        {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
      </button>
    </div>
  );
};

export default ProductItem;
