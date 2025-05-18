import React from "react";
import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import Link from "next/link";

import rice1 from "../../../public/images/rice1.jpg";
import rice2 from "../../../public/images/rice2.jpg";
import rice3 from "../../../public/images/rice3.jpg";
import olive1 from "../../../public/images/olive1.jpg";
import olive2 from "../../../public/images/olive2.jpg";
import olive3 from "../../../public/images/olive3.jpg";
import reshte from "../../../public/images/reshte.jpg";
import kerak from "../../../public/images/kerak.jpg";

const AllProducts = () => {
  const res = fetch("http://localhost:3000/api/products");
  const data = [
    {
      id: 1,
      title: "برنج هاشمی",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
      img: rice1,
    },
    {
      id: 2,
      title: "برنج صدری",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
      img: rice2,
    },
    {
      id: 3,
      title: "برنج دودی",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
      img: rice3,
    },
    {
      id: 4,
      title: "برنج دم سیاه",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 36900,
      img: rice1,
    },
    {
      id: 5,
      title: "زیتون ماری",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
      img: olive1,
    },
    {
      id: 6,
      title: "زیتون شکسته",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
      img: olive2,
    },
    {
      id: 7,
      title: "زیتون کنسروی",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
      img: olive3,
    },
    {
      id: 8,
      title: "رشته خشکار",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
      img: reshte,
    },
    {
        id: 9,
        title: "چای کرک",
        body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
        price: 3200,
        img: kerak,
      },
  ];
  return (
    <Container>
      <h1 className=" text-3xl text-[#38b000] text-center font-bold">تمامی محصولات</h1>
      <div className="grid grid-cols-4 gap-6">
        {data.map((item) => (
          <Link key={item.id} href={`store/${item.id}`}>
            <ProductItem
              img={item.img}
              title={item.title}
              body={item.body}
              price={item.price}
            />
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default AllProducts;
