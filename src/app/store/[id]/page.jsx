import Container from "@/components/Container";
import Image from "next/image";
import { Button } from "primereact/button";
import Comments from "@/components/Comments";

async function getProduct(id) {
  const res = await fetch(`http://localhost:3001/api/products/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p>محصول یافت نشد</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
        <div className="relative ">
          <Image
            src={product.img}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 col-span-3">
          <h1 className="text-3xl font-bold text-[#38b000]">{product.title}</h1>
          <p className="text-gray-600 text-lg">{product.body}</p>
          <div className="text-2xl font-bold mt-4">
            {product.price.toLocaleString()} تومان
          </div>
          <Button
            label="افزودن به سبد خرید"
            className="bg-green-600 text-white py-3 mt-4"
            icon="pi pi-shopping-cart"
          />
        </div>
      </div>

      {/* Comments Section */}
      <Comments productId={product.id} comments={product.comments || []} />
    </Container>
  );
}
