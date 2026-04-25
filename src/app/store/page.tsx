import React from "react";
import ProductItem from "@/components/ProductItem";
import fs from "fs";
import path from "path";

interface Product {
  id: number;
  title: string;
  body: string;
  price: number;
  discount: number;
  img: string;
  comments: Array<{
    id: number;
    userId: number;
    username: string;
    text: string;
    rating: number;
    createdAt: string;
  }>;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store'
  });

  if (!res.ok) {
    return [];
  }
}

export default async function StorePage() {
  const products = await getProducts();

  return (
    <div className='container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8'>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          فروشگاه
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          محصولات تازه و با کیفیت
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="mb-2">محصولی یافت نشد</p>
          <p className="text-xs text-muted-foreground">
            لطفاً مطمئن شوید که فایل db.json موجود است و شامل محصولات می‌باشد
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground text-center">
            {products.length} محصول یافت شد
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                img={product.img}
                title={product.title}
                body={product.body}
                price={product.price}
                discount={product.discount || 0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
