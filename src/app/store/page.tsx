import React from "react";
import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  body: string;
  price: number;
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

  return res.json();
}

export default async function StorePage() {
  const products = await getProducts();

  return (
    <div className='px-20 dark:bg-[#0B090A]'>
      <div className="py-8 dark:bg-[#0B090A]">
        <h1 className="text-3xl text-[#38b000] text-center font-bold mb-8">
          فروشگاه
        </h1>

        {products.length === 0 ? (
          <div className="text-center text-gray-500">
            محصولی یافت نشد
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="transform transition-transform hover:scale-105">
                <Link href={`/store/${product.id}`} className="block">
                  <ProductItem
                    id={product.id}
                    img={product.img}
                    title={product.title}
                    body={product.body}
                    price={product.price}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
