import React from "react";
import rice1 from "../../public/images/rice1.jpg";
import Image from "next/image";

const ProductItem = ({ title, body, price }) => {
  return (
    <div className="shadow-md rounded-md p-3">
      {/* <img src={rice1} alt="cvxcv" /> */}
      <Image src={rice1} className="rounded-md" alt="Picture of the author" />
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

export default ProductItem;
