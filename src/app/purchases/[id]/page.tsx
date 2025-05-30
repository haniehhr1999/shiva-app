"use client"

import { useRouter } from "next/navigation";

const PurchaseDetails = () => {
  const router = useRouter();
  console.log(router)
//   const { id } = router.query;

  return (
    <div>
        vhkj
      {/* <h1>جزئیات خرید کاربر {id}</h1> */}
    </div>
  );
};

export default PurchaseDetails;