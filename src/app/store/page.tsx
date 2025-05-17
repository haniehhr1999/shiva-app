import React from "react";
import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import Link from "next/link";

import { verifyJwt } from '../../../lib/jwt';
import { cookies } from "next/headers";


const AllProducts = async({ cookies }: { cookies: any }) => {

  const token = cookies.get('token')?.value || '';

  const user = token ? await verifyJwt(token) : null;

  if (!user) {
    // Redirect user to login or show a message
    // Redirect example:
    // throw redirect('/login');
  }

  
  const data = [
    {
      id: 1,
      title: "product 1",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
    },
    {
      id: 2,
      title: "product 2",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
    },
    {
      id: 3,
      title: "product 3",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
    },
    {
      id: 4,
      title: "product 4",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 36900,
    },
  ];
  return (
    <Container>
      <h1 className="text-pink-700 text-3xl">All Products</h1>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => (
          <Link href={`store/${item.id}`}>
            <ProductItem title ={item.title} body={item.body} price={item.price}/>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default AllProducts;
