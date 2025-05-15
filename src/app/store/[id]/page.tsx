import React from "react";

// type TypeParams {
//     id:number ;
// }

const SingleProduct = async ({ params}) => {
  const params1 = await params
  console.log(params1)

  async function getData() {
    const res = await fetch(`/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Data not found");
    }

    return res.json();
  }

  const { id } = params;
  console.log(id, "id");

  const data = await getData();

  return <div>{data.message}</div>;
};

export default SingleProduct;
