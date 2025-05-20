import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/../lib/auth";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default async function Home() {
  // try {
  //   const cookieStore = await cookies();
  //   const token = cookieStore.get("token");
  //   const isVerify = await verifyJwt(token);

  //   console.log('token =>' , token)

  //   if (!isVerify) {
  //     redirect("login");
  //   }
  // } catch (error) {
  //   redirect('/login')
  // }

  return (
    <div className="bg-slate-100">
      <h3 className="text-xl text-center">پرفروش ترین ها</h3>
      <div className="grid grid-cols-4 gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rem
          cupiditate placeat praesentium, voluptates nam sit repellendus
          molestiae voluptatum numquam.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rem
          cupiditate placeat praesentium, voluptates nam sit repellendus
          molestiae voluptatum numquam.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rem
          cupiditate placeat praesentium, voluptates nam sit repellendus
          molestiae voluptatum numquam.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rem
          cupiditate placeat praesentium, voluptates nam sit repellendus
          molestiae voluptatum numquam.
        </p>
      </div>


      <h3 className="text-xl text-center">نظرات ترین </h3>
      <div className="grid grid-cols-4 gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rem
          cupiditate placeat praesentium, voluptates nam sit repellendus
          molestiae voluptatum numquam.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rem
          cupiditate placeat praesentium, voluptates nam sit repellendus
          molestiae voluptatum numquam.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rem
          cupiditate placeat praesentium, voluptates nam sit repellendus
          molestiae voluptatum numquam.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident rem
          cupiditate placeat praesentium, voluptates nam sit repellendus
          molestiae voluptatum numquam.
        </p>
      </div>
    </div>
  );
}
