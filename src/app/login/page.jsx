"use client";

import React, { useRef, useState } from "react";
// import bg from "../../../public/images/bg-login.jpg"

const LoginPage = () => {
  const inputRef = useRef({});
  const [isOtp, setIsOtp] = useState(false);
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsOtp(true);
    setMobile(inputRef.current.mobile.value);
    // fetch('localhost:3000/api/login' , {
    //     method : 'POST'
    // })
    // .then()
  };
  const handleLogin = (e) => {
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        mobilePhone: mobile,
        code: inputRef.current.otp.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Cookies.set('accessToken', data.data.token)
        // router.push('/profile')
      });

    console.log("hi");
  };

  return (
    <div className={`bg-log h-screen flex justify-center items-center`}>
      <div className="bg-[#ffffff63] w-1/3 p-8 rounded-2xl">
        {isOtp ? (
          <form action="" onSubmit={handleLogin}>
            <h1 className="text-2xl font-bold">ثبت نام</h1>
            <div className="my-4">
              <input
                ref={(item) => {
                  inputRef.current.otp = item;
                }}
                type="number"
                placeholder="کد ارسالی را وارد کنید..."
                className="w-full rounded bg-white py-2 px-3"
              />
            </div>
            <button className="rounded cursor-pointer py-2 px-3 bg-sky-950 text-white w-full">
              اوکی
            </button>
          </form>
        ) : (
          <form action="" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold">ورود با شماره </h1>

            <div className="my-4">
              <input
                ref={(item) => {
                  inputRef.current.mobile = item;
                }}
                type="number"
                placeholder="شماره تلفن را وارد کنید..."
                className="w-full rounded bg-white py-2 px-3"
              />
            </div>
            <button className="rounded cursor-pointer py-2 px-3 bg-sky-950 text-white w-full">
              ارسال کد{" "}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
