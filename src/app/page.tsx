"use client";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // اگر SSR است، چیزی رندر نکن
    return null;
  }
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

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "lightcoral",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "lightblue",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "lightgreen",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 3
          </div>
        </SwiperSlide>
      </Swiper>

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
