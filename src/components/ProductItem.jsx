import React from "react";
import rice1 from "../../public/images/rice1.jpg";
import Image from "next/image";

const ProductItem = ({ title, body, price, img }) => {
  return (
    <div className="shadow-md rounded-md p-6">
      {/* <img src={rice1} alt="cvxcv" /> */}
      <Image
        src={img}
        className="rounded-md"
        alt="Picture of the author"
        width={300}
        height={300}
      />
      <div className="py-3">
        <h2 className="mb-2 text-[#38b000] text-xl font-bold">{title}</h2>
        <p>{body}</p>
      </div>
      <button className="w-full bg-green-200 rounded py-2">افزودن به سبد خرید</button>
    </div>
  );
};

export default ProductItem;
