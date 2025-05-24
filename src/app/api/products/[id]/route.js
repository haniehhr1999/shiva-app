import { NextResponse } from "next/server";

const products = [
  {
    id: 1,
    title: "برنج هاشمی",
    body: "برنج هاشمی مرغوب شمال با کیفیت عالی و طعم بی نظیر",
    price: 320000,
    img: "/images/rice1.jpg",
  },
  {
    id: 2,
    title: "برنج صدری",
    body: "برنج صدری درجه یک با عطر و طعم فوق العاده",
    price: 280000,
    img: "/images/rice2.jpg",
  },
  {
    id: 3,
    title: "برنج دودی",
    body: "برنج دودی با طعم دودی طبیعی و کیفیت عالی",
    price: 350000,
    img: "/images/rice3.jpg",
  },
  {
    id: 4,
    title: "برنج دم سیاه",
    body: "برنج دم سیاه با کیفیت عالی و طعم بی نظیر",
    price: 369000,
    img: "/images/rice1.jpg",
  },
  {
    id: 5,
    title: "زیتون ماری",
    body: "زیتون ماری تازه و خوش طعم",
    price: 85000,
    img: "/images/olive1.jpg",
  },
  {
    id: 6,
    title: "زیتون شکسته",
    body: "زیتون شکسته با کیفیت عالی",
    price: 75000,
    img: "/images/olive2.jpg",
  },
  {
    id: 7,
    title: "زیتون کنسروی",
    body: "زیتون کنسروی با کیفیت عالی و طعم بی نظیر",
    price: 65000,
    img: "/images/olive3.jpg",
  },
  {
    id: 8,
    title: "رشته خشکار",
    body: "رشته خشکار با کیفیت عالی و طعم بی نظیر",
    price: 45000,
    img: "/images/reshte.jpg",
  },
  {
    id: 9,
    title: "چای کرک",
    body: "چای کرک با کیفیت عالی و طعم بی نظیر",
    price: 55000,
    img: "/images/kerak.jpg",
  },
];

export async function GET(request, { params }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return NextResponse.json(
      { error: "محصول یافت نشد" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
} 